<template>
  <v-container id="completion" class="mb-6">
    <v-sheet id="completion-messages">
      <v-row no-gutters>
        <h3>Messages</h3>
      </v-row>
      <v-divider class="mt-2 mb-2"></v-divider>
      <template v-for="(message, index) in messages">
        <v-sheet
          class="mt-4 pa-2"
          height="auto"
          elevation="4"
        >
          <v-row no-gutters class="align-center">
            <p>Message {{ index }}</p>
            <v-btn 
              style="margin-left: auto;" 
              color="red" 
              density="compact"
              @click="removeMessage(index)">
              Delete
            </v-btn>
          </v-row>
          <v-row no-gutters>
            <v-select 
              label="Role" 
              :items="roles"
              :model-value="message.role"
              @update:model-value="role => changeMessageRole(index, role)"
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-textarea label="Content"
              v-model="message.content"
              rows="2"
              variant="filled"
            ></v-textarea>
          </v-row>
          <v-row no-gutters v-if="message.role === 'assistant'">
            <CodeEditor
              v-model="message.toolCallsCode"
              :languages="[['json', 'Tool Calls (JSON Array)']]"
              :tab-spaces="2"
              :wrap="true"
              font-size="16px"
              width="100%"
              height="auto"
            ></CodeEditor>
          </v-row>
          <v-row no-gutters v-if="message.role === 'tool'">
            <v-text-field label="tool_call_id" v-model="message.toolCallId"></v-text-field>
          </v-row>
        </v-sheet>
      </template>
      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn block @click="addMessage">New Message</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block @click="sendRequest" color="purple-darken-2">Send Request</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-4">
        <h3>Response</h3>
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-col cols="12" class="mt-4" v-if="responseCode">
          <CodeEditor
            v-model="responseCode"
            :languages="[['json', 'JSON']]"
            :tab-spaces="2"
            :wrap="true"
            font-size="16px"
            width="100%"
            height="auto"
          ></CodeEditor>
        </v-col>
      </v-row>
    </v-sheet>

    <v-navigation-drawer location="right" width="360">
      <v-container>
        <v-row no-gutters>
          <h3>Parameters</h3>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <p>Temperature</p>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-text-field
              v-model="temperature"
              style="width: 80px; margin-left: auto; margin-right: 8px;"
              density="compact"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slider 
              v-model="temperature"
              class="ma-2" 
              min="0" 
              max="2" 
              step="0.01" 
              hide-details>
            </v-slider>
          </v-col>
        </v-row>
  
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <p>Max Tokens</p>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-text-field
              v-model.number="maxTokens"
              style="width: 80px; margin-left: auto; margin-right: 8px;"
              density="compact"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slider 
              v-model="maxTokens"
              class="ma-2" 
              min="1" 
              max="8191" 
              step="1" 
              hide-details>
            </v-slider>
          </v-col>
        </v-row>
  
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <p>Top P</p>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-text-field
              v-model="topP"
              style="width: 80px; margin-left: auto; margin-right: 8px;"
              density="compact"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slider 
              v-model="topP"
              class="ma-2" 
              min="0" 
              max="1" 
              step="0.01" 
              hide-details>
            </v-slider>
          </v-col>
        </v-row>
  
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <p>Frequency Penalty</p>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-text-field
              v-model="frequencyPenalty"
              style="width: 80px; margin-left: auto; margin-right: 8px;"
              density="compact"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slider 
              v-model="frequencyPenalty"
              class="ma-2" 
              min="0" 
              max="2" 
              step="0.01" 
              hide-details>
            </v-slider>
          </v-col>
        </v-row>
  
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <p>Presence Penalty</p>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-text-field
              v-model="presencePenalty"
              style="width: 80px; margin-left: auto; margin-right: 8px;"
              density="compact"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slider 
              v-model="presencePenalty"
              class="ma-2" 
              min="0" 
              max="2" 
              step="0.01" 
              hide-details>
            </v-slider>
          </v-col>
        </v-row>
  
        <v-row no-gutters>
          <v-col cols="12" align-self="center">
            <p>Tools (JSON Array)</p>
          </v-col>
          <v-col cols="12" align-self="start">
            <CodeEditor
              v-model="toolsCode"
              :languages="[['json', 'JSON']]"
              :tab-spaces="2"
              :wrap="true"
              font-size="12px"
              width="100%"
              height="auto"
            ></CodeEditor>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-dialog
      v-model="dialogShown"
      width="auto"
    >
      <v-card
        max-width="400"
        :text="dialogMessage"
        title="Alert"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="hideAlertDialog"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: "CompletionView"
  };
</script>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

import { useModelSetting } from '@/store';
import { chatCompletionsV1 } from '@/api/openai';
import { watchEffect } from 'vue';

const roles = ref(["system", "user", "assistant", "tool"]);

// ---------- parameters ---------- //

const DefaultParams = {
  temperature: 0.0,
  maxTokens: 4096,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  tools: '[]',
};

const storageParams = useLocalStorage('openai-playground-chat-completions-params', DefaultParams);

const temperature = ref(storageParams.value.temperature || DefaultParams.temperature);
const maxTokens = ref(storageParams.value.maxTokens || DefaultParams.maxTokens);
const topP = ref(storageParams.value.topP || DefaultParams.topP);
const frequencyPenalty = ref(storageParams.value.frequencyPenalty || DefaultParams.frequencyPenalty);
const presencePenalty = ref(storageParams.value.presencePenalty || DefaultParams.presencePenalty);

const toolsCode = ref(storageParams.value.tools || DefaultParams.tools);

watchEffect(() => {
  storageParams.value.temperature = temperature.value;
  storageParams.value.maxTokens = maxTokens.value;
  storageParams.value.topP = topP.value;
  storageParams.value.frequencyPenalty = frequencyPenalty.value;
  storageParams.value.presencePenalty = presencePenalty.value;
  storageParams.value.tools = toolsCode.value;
})


// ---------- messages ---------- //

const messages = ref([
  {
    role: "system",
    content: "You are a helpful assistant."
  },
  {
    role: "user",
    content: "Hello!"
  }
]);

const storageMessages = useLocalStorage('openai-playground-chat-completions-messages', []);
if (storageMessages.value.length > 0) {
  messages.value = storageMessages.value;
}

watchEffect(() => {
  storageMessages.value = messages.value;
});

function addMessage(role = "user") {
  messages.value.push({
    role,
    content: "",
  });
}

function removeMessage(index) {
  messages.value.splice(index, 1);
}

function changeMessageRole(index, role) {
  if (!roles.value.includes(role)) {
    console.log(`Invalid role: ${role}.`)
    return;
  }

  const oldMessage = messages.value[index];
  if (!oldMessage) {
    console.log("Message not found.");
    return;
  }

  if (oldMessage.role === role) {
    console.log("Role is not changed");
    return;
  }

  const newMessage = {
    role: role,
    content: oldMessage.content,
  }

  if (role === "assistant") {
    newMessage.toolCallsCode = `[]`;
  }

  if (role === "tool") {
    newMessage.toolCallId = "";
  }

  console.log(`Change message index: ${index} to: `, newMessage);

  messages.value.splice(index, 1, newMessage);
}

/**
 * Format and virify messages.
 */
function formatMessagesForRequest() {
  return messages.value.map((message, index) => {
    const formatted = {
      "role": message.role,
      "content": message.content || null,
    }

    try {
      if (formatted.role === "system" || formatted.role === "user") {
        if (!formatted.content) {
          throw new Error(`ParseError: Message ${index}. Missing required parameter 'content'.`);
        }
      } else if (formatted.role === "assistant") {
        formatted["tool_calls"] = message.toolCallsCode ? JSON.parse(message.toolCallsCode) : [];
        if (!Array.isArray(formatted.tool_calls) || formatted.tool_calls.length === 0 && !formatted.content) {
          throw new Error(`ParseError: Message ${index}. Parameter 'content' is required in case 'tool_calls' is not specified.`);
        }
      } else if (formatted.role === "tool") {
        formatted["tool_call_id"] = message.toolCallId || null;
        if (!formatted.tool_call_id) {
          throw new Error(`ParseError: Message ${index}. Missing required parameter 'tool_call_id'.`);
        }
      }
    } catch (error) {
      if (error.message?.startsWith("ParseError")) {
        throw error
      }
      throw new Error(`ParseError: Message ${index}. ${error.message || error.stack}`);
    }

    return formatted;
  });
}

// ---------- response ---------- //

let responseCode = ref(`{}`);

// ---------- Request ---------- //

async function sendRequest() {
  const { apiKey, modelName, endPoint } = storeToRefs(useModelSetting());

  if (!apiKey.value) {
    showAlertDialog("API Key is required. Please set API Key in settings.");
    return;
  }

  if (!modelName.value) {
    showAlertDialog("Model Name is required. Please set Model Name in settings.");
    return;
  }

  if (!endPoint.value) {
    showAlertDialog("End Point is required. Please set End Point in settings.");
    return;
  }

  let tools = [];
  try {
    tools = JSON.parse(toolsCode.value);
  } catch (error) {
    showAlertDialog("Tools JSON is invalid.");
    return;
  }

  let openaiMessages = [];
  try {
    openaiMessages = formatMessagesForRequest()
  } catch (error) {
    showAlertDialog("Parsing messages failed.");
    return;
  }

  responseCode.value = "";

  const apiResponse = await chatCompletionsV1({
    apiKey: apiKey.value,
    endPoint: endPoint.value,
    data: {
      model: modelName.value,
      messages: openaiMessages,
      temperature: Number(temperature.value),
      top_p: Number(topP.value),
      max_tokens: Number(maxTokens.value),
      stream: false,
      tools: tools,
    }
  });

  responseCode.value = JSON.stringify(apiResponse, null, 2);
}

const dialogShown = ref(false);
const dialogMessage = ref("");
function showAlertDialog(message) {
  dialogMessage.value = message || "Alert";
  dialogShown.value = true;
}

function hideAlertDialog() {
  dialogShown.value = false;
  dialogMessage.value = "";
}

</script>
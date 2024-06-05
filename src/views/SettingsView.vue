<template>
  <v-container id="settings">
    <v-text-field label="API Key" v-model="apiKey"></v-text-field>
    <v-text-field label="Model" v-model="modelName"></v-text-field>
    <v-text-field label="End Point" v-model="endPoint"></v-text-field>
  </v-container>
</template>

<script>
  export default {
    name: "SettingsView"
  };
</script>

<script setup>
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModelSetting } from '@/store';
import { useLocalStorage } from '@vueuse/core';

const storageModelName = useLocalStorage('openai-playground-model-name', "");
const storageEndPoint = useLocalStorage('openai-playground-end-point', "");

const { apiKey, modelName, endPoint } = storeToRefs(useModelSetting());

if (storageModelName.value) {
  modelName.value = storageModelName.value;
}

if (storageEndPoint.value) {
  endPoint.value = storageEndPoint.value;
}

watchEffect(() => {
  storageModelName.value = modelName.value;
  storageEndPoint.value = endPoint.value;
});
</script>
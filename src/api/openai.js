import axios from "axios";

/**
 * 
 * @param {Object} payload 
 * @param {String} payload.apiKey 
 * @param {String} payload.endPoint 
 * @param {Object} payload.data 
 * @returns 
 */
export async function chatCompletionsV1({ apiKey, endPoint, data }) {
  let baseUrl = endPoint ||" https://api.openai.com/v1/";
  
  if (!apiKey) {
    throw new TypeError("Missing openAI API Key");
  }
  if (!endPoint) {
    throw new TypeError("Missing openAI API Endpoint");
  }

  const url = new URL("chat/completions", baseUrl);

  const response = await axios.post(url.href, data, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    }
  });

  return response.data;
}
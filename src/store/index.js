import { ref } from "vue";
import { defineStore } from "pinia";

export const useModelSetting = defineStore('modelSetting', () => {
  const apiKey = ref("");
  const modelName = ref("");
  const endPoint = ref("")

  return { apiKey, modelName, endPoint }
});
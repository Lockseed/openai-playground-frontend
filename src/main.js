import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import CodeEditor from "@/components/SimpleCodeEditor/CodeEditor.vue";

const pinia = createPinia()
loadFonts()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .component('CodeEditor', CodeEditor)
  .mount('#app')

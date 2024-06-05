import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import vuetify from './plugins/vuetify'
import CodeEditor from "simple-code-editor";
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia()
loadFonts()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .component('CodeEditor', CodeEditor)
  .mount('#app')

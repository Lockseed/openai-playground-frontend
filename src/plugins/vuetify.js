// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md1 } from "vuetify/blueprints";

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    blueprint: md1
  }
)

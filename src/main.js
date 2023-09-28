import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/scss/style.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

const vuetify = createVuetify({
  components,
  directives,
  labs,
})

const app = createApp(App)

app.use(router)
.use(vuetify)
.use(store)
.use(VueCropper)
app.mount('#app')
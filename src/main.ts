import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { MaskInput } from 'vue-3-mask'

const app = createApp(App)
app.component('MaskInput', MaskInput)
app.use(router)
app.mount('#app')

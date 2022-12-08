import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import store from './config/store'
import router from './config/router'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

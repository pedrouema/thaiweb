import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import VueTheMask from 'vue-the-mask'
import store from './config/store'
import router from './config/router'
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = localStorage.getItem('token');
if( token ){
 window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

router.beforeEach((to, from, next) => {
    if(to.name === 'login' && token)  next({name: 'home'}) 
    else {
        if(to.name !== 'login' && !token) next({name: 'login'});
        else next();
    }
})

const app = createApp(App)
app.use(VueTheMask)
app.use(bootstrap)
app.use(store)
app.use(router)
app.use(VueSweetalert2)
app.mount('#app')



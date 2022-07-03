import * as Vue from 'vue' // in Vue 3
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

window.axios = axios
window.title = "DRFSH"
window.url = 'https://teetup.iran.liara.run/api/wwh/'

const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

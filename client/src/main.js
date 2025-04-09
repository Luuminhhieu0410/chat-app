// import "./assets/css/bootstrap.css";
// import "./assets/css/tailwind.css"
// import  "./assets/js/bootstrap.bundle.js"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

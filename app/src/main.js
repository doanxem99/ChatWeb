import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import FontAwesome from './plugins/fontAwesome'
import './style.css'

const pinia = createPinia();

const app = createApp(App)
            .use(router)
            .use(pinia)
            .component("font-awesome-icon", FontAwesome)
            .mount('#app')

import {createRouter, createWebHashHistory} from 'vue-router'

import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import Chatview from '@/pages/ChatView.vue'
import Home from '@/pages/Home.vue'
import Reel from '@/pages/Reel.vue'
import FPassword from '@/pages/FPassword.vue'
import Profile from '@/pages/Profile.vue'

const routes = [
        { path: '/', component: Home},
        { path: '/signup', component: Signup },
        { path: '/login', component: Login },
        { path: '/fpassword', component: FPassword},
        { path: '/chat', component: Chatview },
        { path: '/reel', component: Reel },
        { path: '/profile', component: Profile }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

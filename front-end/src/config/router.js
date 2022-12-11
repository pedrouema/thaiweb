import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

const cors  = require('cors')


const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
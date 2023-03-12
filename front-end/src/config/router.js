import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import LoginPage from '@/components/login/LoginPage'
import CronogramaPage from '@/components/cronograma/cronogramaPage'
import FinanceiroPage from '@/components/financeiro/financeiroPage'
import AnalisesPage from '@/components/analises/analisesPage'

const cors  = require('cors')


const routes = [
    {
        name: 'login',
        path: '/',
        component: LoginPage
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    },
    {
        name: 'cronogramaPage',
        path: '/cronograma',
        component: CronogramaPage
    },
    {
        name: 'financeiroPage',
        path: '/financeiro',
        component: FinanceiroPage
    },
    {
        name: 'analisesPage',
        path: '/analises',
        component: AnalisesPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
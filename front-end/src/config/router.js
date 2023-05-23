import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import LoginPage from '@/components/login/LoginPage'
import CronogramaPage from '@/components/cronograma/cronogramaPage'
import FinanceiroPage from '@/components/financeiro/financeiroPage'
import AnalisesPage from '@/components/analises/analisesPage'
import RelatorioAlunos from '@/components/admin/RelatorioAlunos'
import RelatorioDespesasPaga from '@/components/financeiro/RelatorioDespesasPaga'
import RelatorioPlanos from '@/components/admin/RelatorioPlanos'
import RelatorioTurmas from '@/components/admin/RelatorioTurmas'
import RelatorioInstrutores from '@/components/admin/RelatorioInstrutores'
import UsuarioAcesso from '@/components/login/UsuarioAcesso'

const cors  = require('cors')


const routes = [
    {
        name: 'login',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'primeiroacesso',
        path: '/primeiroacesso',
        component: UsuarioAcesso
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
    },
    {
        name: 'relatorioalunos',
        path: '/relatorioalunos',
        component: RelatorioAlunos
    },
    {
        name: 'relatorioplanos',
        path: '/relatorioplanos',
        component: RelatorioPlanos
    },
    {
        name: 'relatorioinstrutores',
        path: '/relatorioinstrutores',
        component: RelatorioInstrutores
    },
    {
        name: 'relatorioturmas',
        path: '/relatorioturmas',
        component: RelatorioTurmas
    },
    {
        name: 'relatoriodespesaspaga',
        path: '/relatoriodespesaspaga',
        component: RelatorioDespesasPaga
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
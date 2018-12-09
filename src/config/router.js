import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'
Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router

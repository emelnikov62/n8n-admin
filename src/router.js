import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AdminMain from './pages/admin/AdminMain.vue'
import Admin from './pages/admin/Admin.vue'
import Auth from './pages/Auth.vue'
import AdminDomains from './pages/admin/AdminDomains.vue'


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: App
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                checkAdministrationPermissions: true
            },
            children: [
                {
                    path: 'general',
                    name: 'admin-general',
                    component: AdminMain
                },
                {
                    path: 'domains/:type',
                    name: 'admin-domains',
                    component: AdminDomains
                }
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

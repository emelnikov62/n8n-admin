import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AdminMain from './pages/admin/AdminMain.vue'
import Admin from './pages/admin/Admin.vue'
import Auth from './pages/Auth.vue'
import AdminDomains from './pages/admin/AdminDomains.vue'
import AdminDomain from './pages/admin/AdminDomain.vue'
import AdminDomainMain from './pages/admin/AdminDomainMain.vue'
import AdminDomainActions from './pages/admin/AdminDomainActions.vue'


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
                },
                {
                    path: 'domain/:id',
                    name: 'admin-domain',
                    component: AdminDomain,
                    children: [
                        {
                            path: 'settings-main',
                            name: 'admin-domain-settings-main',
                            component: AdminDomainMain
                        },
                        {
                            path: 'settings-actions',
                            name: 'admin-domain-settings-actions',
                            component: AdminDomainActions
                        }
                    ]
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

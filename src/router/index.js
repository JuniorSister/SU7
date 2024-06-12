import { createRouter, createWebHistory,  } from 'vue-router'

export const routes = [
    {
        path: '/',
        redirect: '/SuSeven',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import("../components/login.vue")
    },
    {
        name: 'account',
        path: '/account',
        component: () => import("../components/account.vue")
    },
    {
        name: 'SuSeven',
        path: '/SuSeven',
        component: () => import("../components/SuSeven.vue")
    },
 
]
 
const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
})
 
 
router.beforeEach((to,from, next) => {
    next()
})
 
 
export default router
import { createWebHistory, createRouter } from 'vue-router';

const routes: any = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/ErrorView.vue'), // 404页面
    },
    {
        path: '/',
        redirect: '/start'
    },
    {
        path: '/start',
        name: 'Start',
        component: () => import('../views/StartView.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
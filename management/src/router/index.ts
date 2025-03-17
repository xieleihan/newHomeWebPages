import { createWebHistory, createRouter } from 'vue-router';

const routes: any = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/ErrorView.vue'), // 404页面
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
import { createWebHistory, createRouter } from 'vue-router';

const routes: any = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/ErrorView.vue'), // 404页面
        meta: {
            breadcrumb: '404',
        }
    },
    {
        path: '/',
        redirect: '/start'
    },
    {
        path: '/start',
        name: 'Start',
        component: () => import('../views/StartView.vue'),
        meta: {
            breadcrumb: '开始',
        },
        children: [
            {
                path: 'userAgreement',
                name: 'UserAgreement',
                component: () => import('../components/base/UserAgreement.vue'),
                meta: {
                    breadcrumb: '用户协议',
                }
            },
            {
                path: 'privacyPolicy',
                name: 'PrivacyPolicy',
                component: () => import('../components/base/PrivacyPolicy.vue'),
                meta: {
                    breadcrumb: '隐私政策',
                }
            }
        ]
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            breadcrumb: '首页',
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
        meta: {
            breadcrumb: '关于我们',
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
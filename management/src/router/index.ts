import { createWebHistory, createRouter } from 'vue-router';

// 导入工具
import { getCookie } from '../utils/index';

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
            requiresAuth: true
        },
        children: [
            {
                path: 'overview',
                name: 'Overview',
                component: () => import('../components/container/HomeOverview.vue'),
                meta: {
                    breadcrumb: '概览',
                    requiresAuth: true
                }
            },
            {
                path: 'systemlog',
                name: 'SystemLog',
                component: () => import('../components/container/HomeSystemlog.vue'),
                meta: {
                    breadcrumb: '系统日志',
                    requiresAuth: true
                }
            },
            {
                path: 'serverstatus',
                name: 'ServerStatus',
                component: () => import('../components/container/HomeServerstatus.vue'),
                meta: {
                    breadcrumb: '服务器状态',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
        meta: {
            breadcrumb: '关于我们',
            requiresAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        // 获取cookies中是否有auto_token字段
        const token = getCookie('AUTO_TOKEN');;
        if (!token) {
            next({
                path: '/start',
                query: { redirect: to.fullPath }
            }) // 生产环境使用
            // next() // 开发环境使用
        } else {
            next()
        }
    } else {
        next() // 保证一定要调用 next()
    }
});

export default router;
// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd组件
import { Spin } from 'antd';

// 导入视图
const App = lazy(() => import('../App')) // 主视图
const RegisterPages = lazy(() => import('../pages/RegisterPages')); // 注册页
const LoginPages = lazy(() => import('../pages/LoginPages')); // 登录页
const Home = lazy(() => import('../pages/HomePages')); // 主页
const ErrorPages = lazy(() => import('../pages/ErrorPages')); // 错误页
const ContactPages = lazy(() => import('../pages/ContactPages')); // 联系页
const SettingsPages = lazy(() => import('../pages/SettingsPages')); // 设置页
const BookstorePages = lazy(() => import('../pages/secondLevelPage/BookstorePages')); // 书店页
const BookreaderPages = lazy(() => import('../pages/secondLevelPage/BookreaderPages')); // 书籍阅读页
const DocumentreaderPages = lazy(() => import('../pages/secondLevelPage/DocumentreaderPages')); // 文档阅读页

// 路由配置
const routes = [
    {
        path: '/',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <App />
            </Suspense>
        ),
    },
    {
        path: '/register',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <RegisterPages />
            </Suspense>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <LoginPages />
            </Suspense>
        ),
    },
    {
        path: '/home',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Home />
            </Suspense>
        ),
    },
    {
        path: '/contact',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <ContactPages />
            </Suspense>
        ),
    },
    {
        path: '/settings',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <SettingsPages />
            </Suspense>
        )
    },
    {
        path: '/bookstore',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <BookstorePages />
            </Suspense>
        ),
        children: [
            {
                path: 'reader',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <BookreaderPages />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/document',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <DocumentreaderPages />
            </Suspense>
        )
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <ErrorPages />
            </Suspense>
        ),
    }
];

// 导出路由表
export default routes;
// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd组件
import { Spin } from 'antd';

// 导入视图
const App = lazy(()=>import('../App')) // 主视图
const Home = lazy(() => import('../pages/HomePages')); // 主页
const ErrorPages = lazy(() => import('../pages/ErrorPages')); // 错误页
const ContactPages = lazy(() => import('../pages/ContactPages')); // 联系页

// 路由配置
const routes = [
    {
        path: '/',
        element: (
            <Suspense fallback={<Spin />}>
                <App />
            </Suspense>
        ),
    },
    {
        path: '/home',
        element: (
            <Suspense fallback={<Spin />}>
                <Home />
            </Suspense>
        ),
    },
    {
        path: '/contact',
        element: (
            <Suspense fallback={<Spin />}>
                <ContactPages />
            </Suspense>
        ),
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<Spin />}>
                <ErrorPages />
            </Suspense>
        ),
    }
];

// 导出路由表
export default routes;
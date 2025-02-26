// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd组件
import { Spin } from 'antd';

// 导入视图
import App from '../App'; // 主视图
const Home = lazy(() => import('../pages/HomePages')); // 主页

// 路由配置
const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/home',
        element: (
            <Suspense fallback={<Spin />}>
                <Home />
            </Suspense>
        ),
    }
];

// 导出路由表
export default routes;
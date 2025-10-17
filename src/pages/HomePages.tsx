// 导入Antd
import { Layout } from 'antd';

// 导入样式
import styles from '../style/HomePages.module.scss';

// 导入组件
import HomeheaderCom from '../components/Modules/home/HomeheaderCom';
import HomecontentCom from '../components/Modules/home/HomecontentCom';
import HomefooterCom from '../components/Modules/home/HomefooterCom';

import LazyLoadWrapper from '../layout/LazyLoadWrapper';

// 导入React
import { useEffect, useState } from 'react';

// 导入push
import subscribeUser from '../utils/pushNotification';

// 导入工具
import { judgeUserAgent } from '../utils/common';
// 使用React Redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/index';
import { setUserAgentWidthStore } from '../store/Modules/WindowsSystemOptionsStore';

function HomePages() {
    // 创建React变量
    const [userAgent, setUserAgent] = useState<string>('pc');
    const [userAgentWidth, setUserAgentWidth] = useState<number>(0);
    // 初始化Redux
  const dispatch = useDispatch<AppDispatch>();
    // 创建生命周期
    useEffect(() => {
        // 订阅推送通知
        subscribeUser();

        // 判断用户系统
        setUserAgent(judgeUserAgent());

        // 定义窗口大小更新函数
        const handleResize = () => {
            setUserAgentWidth(window.innerWidth);
            dispatch(setUserAgentWidthStore(window.innerWidth));
        };

        // 初始化 userAgentWidth
        handleResize();

        // 监听窗口变化
        window.addEventListener("resize", handleResize);

        // 组件卸载时移除监听器，防止内存泄漏
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Layout className={styles.home_layout}>
                {/* 顶部栏 */}
                {/* @ts-expect-error: HomeheaderCom does not have type definitions */}
                <HomeheaderCom styles={styles} />
                {/* 内容区 */}
                {/* @ts-expect-error: : HomecontentCom does not have type definitions */}
                <HomecontentCom userAgentWidth={userAgentWidth} userAgent={userAgent} styles={styles} />
                {/* 底部栏 */}
                <LazyLoadWrapper minHeight='fit-content'>
                    { /* @ts-expect-error: HomefooterCom does not have type definitions */}
                    <HomefooterCom styles={styles} />
                </LazyLoadWrapper>
            </Layout>
        </>
    );
}

export default HomePages;
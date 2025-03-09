// 导入Antd
import { Layout } from 'antd';

// 导入样式
import styles from '../style/HomePages.module.scss';

// 导入组件
import HomeheaderCom from '../components/Modules/home/HomeheaderCom';
import HomecontentCom from '../components/Modules/home/HomecontentCom';
import HomefooterCom from '../components/Modules/home/HomefooterCom';

// 导入React
import { useEffect } from 'react';

// 导入push
import subscribeUser from '../utils/pushNotification';

function HomePages() {
    
    // 创建生命周期
    useEffect(() => {
        // 订阅推送通知
        subscribeUser();
    }, []);

    return (
        <>
            <Layout className={styles.home_layout}>
                {/* 顶部栏 */}
                {/* @ts-expect-error: HomeheaderCom does not have type definitions */}
                <HomeheaderCom styles={styles} />
                {/* 内容区 */}
                {/* @ts-expect-error: : HomecontentCom does not have type definitions */}
                <HomecontentCom styles={styles} />
                {/* 底部栏 */}
                { /* @ts-expect-error: HomefooterCom does not have type definitions */}
                <HomefooterCom styles={styles} />
            </Layout>
        </>
    );
}

export default HomePages;
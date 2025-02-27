// 导入Antd
import { Layout } from 'antd';

// 导入样式
import styles from '../style/HomePages.module.scss';

// 导入组件
import HomeheaderCom from '../components/Modules/home/HomeheaderCom';
import HomecontentCom from '../components/Modules/home/HomecontentCom';
import HomefooterCom from '../components/Modules/home/HomefooterCom';

function HomePages() {

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
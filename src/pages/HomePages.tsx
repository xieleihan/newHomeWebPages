// 导入Antd
import { Layout } from 'antd';

// 导入样式
import '../style/HomePages.scss';

// 导入组件
import HomeheaderCom from '../components/Modules/home/HomeheaderCom';
import HomecontentCom from '../components/Modules/home/HomecontentCom';
import HomefooterCom from '../components/Modules/home/HomefooterCom';

function HomePages() {

    return (
        <>
            <Layout className='home-layout'>
                {/* 顶部栏 */}
                <HomeheaderCom />
                {/* 内容区 */}
                {/* <HomecontentCom /> */}
                {/* 底部栏 */}
                {/* <HomefooterCom /> */}
            </Layout>
        </>
    );
}

export default HomePages;
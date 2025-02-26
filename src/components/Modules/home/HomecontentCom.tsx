// 导入Antd
import { Layout } from 'antd';

// 导入组件
import PersonalProfile from './Modules/PersonalProfile';

function HomecontentCom() {
    const { Content } = Layout;

    return (
        <>
            <Content className='content'>
                <PersonalProfile />
            </Content>
        </>
    );
}

export default HomecontentCom;
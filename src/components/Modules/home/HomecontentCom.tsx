// 导入Antd
import { Layout } from 'antd';

// 导入组件
import SignatureCom from './Modules/SignatureCom';
import PersonalProfile from './Modules/PersonalProfile'; // 个人资料

interface HomecontentComProps {
    styles: { content: string };
}

function HomecontentCom({ styles }: HomecontentComProps) {
    const { Content } = Layout;

    return (
        <>
            <Content className={styles.content}>
                {/* 个人签名 */}
                <SignatureCom />
                {/* 个人资料 */}
                <PersonalProfile />
            </Content>
        </>
    );
}

export default HomecontentCom;
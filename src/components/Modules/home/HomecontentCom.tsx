// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd
import { Layout, Spin } from 'antd';

// 导入组件
const SignatureCom = lazy(() => import('./Modules/SignatureCom'));
const PersonalProfile = lazy(() => import('./Modules/PersonalProfile')); // 个人资料

interface HomecontentComProps {
    styles: { content: string };
}

function HomecontentCom({ styles }: HomecontentComProps) {
    const { Content } = Layout;

    return (
        <>
            <Content className={styles.content}>
                {/* 个人签名 */}
                <Suspense fallback={<Spin />}>
                    <SignatureCom />
                </Suspense>
                {/* 个人资料 */}
                <Suspense fallback={<Spin />}>
                    <PersonalProfile />
                </Suspense>
            </Content>
        </>
    );
}

export default HomecontentCom;
// 导入React
import { lazy, Suspense } from 'react';

// 导入Antd
import { Layout, Spin } from 'antd';

// 导入组件
const SignatureCom = lazy(() => import('./Modules/SignatureCom'));
const PersonalProfile = lazy(() => import('./Modules/PersonalProfile')); // 个人资料
const BookFlow = lazy(()=> import('./Modules/BookFlow')); // 个人喜欢的书库

interface HomecontentComProps {
    styles: { content: string };
    userAgentWidth: number;
    userAgent: string;
}

function HomecontentCom({ styles, userAgentWidth, userAgent }: HomecontentComProps) {
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
                {/* 个人喜欢的书库 */}
                <Suspense fallback={<Spin />}>
                    <BookFlow userAgent={userAgent} userAgentWidth={userAgentWidth} />
                </Suspense>
            </Content>
        </>
    );
}

export default HomecontentCom;
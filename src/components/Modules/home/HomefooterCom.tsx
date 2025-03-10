// 导入Antd
import { Layout, Col, Row } from 'antd';

interface HomefooterComProps {
    styles: { footer: string,container: string };
}

// 导入组件
import WebsiteinfoCom from './Modules/WebsiteinfoCom';
import CopyrightCom from './Modules/CopyrightCom';

function HomefooterCom({ styles }: HomefooterComProps) {
    const { Footer } = Layout;

    return (
        <>
            <Footer className={styles.footer}>
                <Row className={styles.container}>
                    {/* 网站信息 */}
                    <Col span={10}>
                        <WebsiteinfoCom />
                    </Col>
                    {/* 版权信息和计时器 */}
                    <Col span={14}>
                        <CopyrightCom />
                    </Col>
                </Row>
            </Footer>
        </>
    );
}

export default HomefooterCom;
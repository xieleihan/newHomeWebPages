// 导入Antd
import { Layout, Col, Row } from 'antd';
// 导入Redux相关
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';

interface HomefooterComProps {
    styles: { footer: string, container: string };
}

// 导入组件
import WebsiteinfoCom from './Modules/WebsiteinfoCom';
import CopyrightCom from './Modules/CopyrightCom';

function HomefooterCom({ styles }: HomefooterComProps) {
    const { Footer } = Layout;

    // 从Redux store中读取userAgentWidth的值
    const userAgentWidth = useSelector((state: RootState) => state.windowsSystemOptions.userAgentWidth);

    return (
        <>
            <Footer className={styles.footer}>
                {
                    userAgentWidth > 768 ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <Row className={styles.container}>
                                {/* 网站信息 */}
                                <Col span={24}>
                                    <WebsiteinfoCom />
                                </Col>
                                {/* 版权信息和计时器 */}
                                <Col span={24}>
                                    <CopyrightCom />
                                </Col>
                            </Row>
                        </>
                    )
                }

            </Footer>
        </>
    );
}

export default HomefooterCom;
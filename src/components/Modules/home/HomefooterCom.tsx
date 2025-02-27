// 导入Antd
import { Layout } from 'antd';

interface HomefooterComProps {
    styles: { footer: string };
}

function HomefooterCom({ styles }: HomefooterComProps) {
    const { Footer } = Layout;

    return (
        <>
            <Footer className={styles.footer}>Header</Footer>
        </>
    );
}

export default HomefooterCom;
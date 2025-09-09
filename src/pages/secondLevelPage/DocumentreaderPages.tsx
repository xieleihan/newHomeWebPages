// 导入样式
import styles from '../../style/DocumentreaderPages.module.scss';
import HomeHeaderStyles from '../../style/layout/HeaderComponents.module.scss';
import HomeFooterStyles from '../../style/layout/FooterComponents.module.scss';

// 导入Header
import HomeheaderCom from '../../components/Modules/home/HomeheaderCom';
import HomefooterCom from '../../components/Modules/home/HomefooterCom';

function DocumentreaderPages() { 
    return (
        <>
            <section className={styles.documentreaderPages}>
                {/* @ts-expect-error: HomeheaderCom does not have type definitions */}
                <HomeheaderCom styles={HomeHeaderStyles} />
                <section className={styles.contentBox}>

                </section>
                {/* @ts-expect-error: HomefooterCom does not have type definitions */}
                <HomefooterCom styles={HomeFooterStyles} />
            </section>
        </>
    );
}

export default DocumentreaderPages;
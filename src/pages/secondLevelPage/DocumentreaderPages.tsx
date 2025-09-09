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
                    <section className={styles.SunBar}>
                    </section>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <defs>
                            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.008 0.008"
                                    numOctaves="2"
                                    seed="92"
                                    result="noise"
                                />
                                <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="blurred"
                                    scale="77"
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                />
                            </filter>
                        </defs>
                    </svg>
                </section>
                {/* @ts-expect-error: HomefooterCom does not have type definitions */}
                <HomefooterCom styles={HomeFooterStyles} />
            </section>
        </>
    );
}

export default DocumentreaderPages;
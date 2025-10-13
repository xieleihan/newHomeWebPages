// 导入样式
import styles from '../../../../style/home/SignatureCom.module.scss';

// 导入Typewriter
// @ts-expect-error: Typewriter does not have TypeScript definitions
import Typewriter from 'typewriter-effect/dist/core';

// 导入React
import { useEffect } from 'react';

// 导入图片
import avater from '../../../../assets/images/avater.png';
import arrow from '../../../../assets/icon/arrow.png';
import telegramIcon from '../../../../assets/icon/telegram.svg';

// 导入Antd Design组件
import { Popover } from 'antd';

// 导入React Router
import { useNavigate } from 'react-router-dom';

import '../../../../lang/index';
import { useTranslation } from 'react-i18next';

function SignatureCom() {
    const { t,i18n } = useTranslation();
    // 生命周期创建
    useEffect(() => {
        // 创建Typewriter实例
        const tw = new Typewriter('#typewriter', {
            loop: true,
            strings: [
                t("signatureCom.code"),
                t("signatureCom.idle"),
                t("signatureCom.read"),
                t("signatureCom.dream"),
                "",
                t("signatureCom.new_world"),
            ],
            autoStart: true,
        });
        return () => tw.stop();
    }, [i18n.language])
    
    // 创建一个Popover元素
    const popoverContent = (
        <>
            <span>{t('signatureCom.click_contact')}</span>
        </>
    )

    // 创建一个路由导航
    const navigate = useNavigate();

    return (
        <>
            <section className={styles.SignatureCom}>
                {/* 左边文字 */}
                <div className={styles.topLeft}>
                    <p className={styles.welcome}>
                        {t('signatureCom.welcomeText')}<span className={styles.linear}>{t('signatureCom.name')}</span>
                        <br />
                        {t('signatureCom.job')}
                        <br />
                        {t('signatureCom.working')}
                        <br />
                        {t('signatureCom.Occasionally')}<span id='typewriter'></span>
                        <br />
                        {t('signatureCom.meeting_you')}
                    </p>
                </div>

                {/* 右边头像 */}
                <div className={styles.bottomRight}>
                    <img className={styles.avater} src={avater} alt="个人头像" loading='lazy' />
                </div>

                {/* 下拉箭头 */}
                <div className={styles.arrowBox}>
                    <img loading='lazy' className={styles.arrow} src={arrow} alt="箭头" />
                    <img loading='lazy' className={styles.arrow} src={arrow} alt="箭头" />
                    <img loading='lazy' className={styles.arrow} src={arrow} alt="箭头" />
                </div>

                {/* 右下角联系我 */}
                <div className={styles.contactMe}>
                    <Popover content={popoverContent} placement="top">
                        <img onClick={() => {
                            navigate('/contact');
                        }} className={styles.contactIcon} src={telegramIcon} alt="联系我" loading='lazy' />
                    </Popover>
                </div>
            </section>
        </>
    );
}

export default SignatureCom;
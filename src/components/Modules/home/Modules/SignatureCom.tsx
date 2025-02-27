// 导入样式
import styles from '../../../../style/home/SignatureCom.module.scss';

// 导入Typewriter
// @ts-expect-error: Typewriter does not have TypeScript definitions
import Typewriter from 'typewriter-effect/dist/core';

// 导入React
import { useEffect } from 'react';

// 导入图片
import avater from '../../../../assets/images/avater.png';

function SignatureCom() {
    useEffect(() => {
        // 创建Typewriter实例
        new Typewriter('#typewriter', {
            loop: true,
            strings: ['写写代码', '发个呆', '看看小说', '做个好梦','','前往新世界伊始'],
            autoStart: true,
        });
    },[])


    return (
        <>
            <section className={styles.SignatureCom}>
                <div className={styles.topLeft}>
                    <p className={styles.welcome}>
                        你好,我是<span className={styles.linear}>SouthAki</span>
                        <br />
                        一个前端工程师
                        <br />
                        正在虚拟世界创世中
                        <br />
                        偶尔<span id='typewriter'></span>
                        <br />
                        期待与你相遇!
                    </p>
                </div>
                <div className={styles.bottomRight}>
                    <img className={styles.avater} src={avater} alt="个人头像" loading='lazy' />
                </div>
            </section>
        </>
    );
}

export default SignatureCom;
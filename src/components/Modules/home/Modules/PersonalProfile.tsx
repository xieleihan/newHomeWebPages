// 导入样式
import styles from '../../../../style/home/PersonalProfile.module.scss';

// 导入React
import { useEffect, useRef } from "react";

// 导入waterCode
import waterCode from "../../../../utils/waterCode";

// 导入图片
import avater from "../../../../assets/images/avater.png";

// 导入Antd design组件
import {Button} from "antd";

function PersonalProfile() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // 创建生命周期
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        waterCode(canvas); // 直接调用 waterCode 启动动画

        return () => {
            // 清理画布（可选）
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return (
        <>
            <section className={styles.personalProfile}>
                {/* 背景canvas */}
                <canvas ref={canvasRef} className={styles.canvas}></canvas>

                {/* 内容区域 */}
                <div className={styles.container}>
                    <div className={styles.leftTop}>
                        {/* 头像 */}
                        <div className={styles.avaterBox}>
                            <img className={styles.avater} loading='lazy' src={avater} alt="头像" />
                        </div>
                        <div className={styles.username}>
                            南秋SouthAki
                        </div>
                        {/* 个性签名 */}
                        <div className={styles.signature}>
                            循此苦旅,以达星辰
                        </div>
                        {/* 按钮区域 */}
                        <div className={styles.btnBox}>
                            <Button>Github</Button>
                            <Button>Blog</Button>
                            <Button>WeChat</Button>
                        </div>
                    </div>
                    <div className={styles.rightBottom}>

                    </div>
                </div>
            </section>
        </>
    );
}

export default PersonalProfile;
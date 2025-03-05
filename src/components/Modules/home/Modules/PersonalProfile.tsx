// 导入样式
import styles from '../../../../style/home/PersonalProfile.module.scss';

// 导入React
import { useEffect, useRef } from "react";

// 导入waterCode
import waterCode from "../../../../utils/waterCode";

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
                <canvas ref={canvasRef} className={styles.canvas}></canvas>

                <div className={styles.container}>
                    
                </div>
            </section>
        </>
    );
}

export default PersonalProfile;
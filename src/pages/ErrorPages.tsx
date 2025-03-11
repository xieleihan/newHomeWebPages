// 导入样式
import styles from '../style/ErrorPages.module.scss';

// 导入图片
import error from '../assets/icon/404.svg';

// 导入Antd Design组件
import { Button } from 'antd';
// 导入Antd Design Mobile组件
import { NavBar } from 'antd-mobile'

// 导入工具
import { judgeUserAgent } from '../utils/common';

// 导入React
import { useEffect, useState } from 'react';

// 导入React Router
import { useNavigate } from 'react-router-dom';

function ErrorPages() {
    // 创建React变量
    const [userAgent, setUserAgent] = useState<string>('pc');
    const [userAgentWidth, setUserAgentWidth] = useState<number>(0);

    // 生命周期创建
    useEffect(() => {
        // 判断用户系统
        setUserAgent(judgeUserAgent());

        // 定义窗口大小更新函数
        const handleResize = () => {
            setUserAgentWidth(window.innerWidth);
        };

        // 初始化 userAgentWidth
        handleResize();

        // 监听窗口变化
        window.addEventListener("resize", handleResize);

        // 组件卸载时移除监听器，防止内存泄漏
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 初始化导航
    const navigate = useNavigate();

    // 返回上一页
    const goToLastPages = () => {
        navigate(-1);
    }

    // 返回首页
    const goToHomePages = () => {
        navigate('/home');
    }

    return (
        <>
            <div className={styles.errorPages}>
                {
                    userAgent === 'pc' && userAgentWidth > 768 ? null : (
                        <>
                            <NavBar onBack={goToLastPages} className={styles.navbar}>Error</NavBar>
                        </>
                    )
                }
                <img loading='lazy' className={styles.errorImg} src={error} alt="404" />
                <p className={styles.errorWord}>
                    404 Not Found
                </p>
                <p className={styles.errorDesc}>
                    你来到无人问津的荒漠
                </p>
                <Button
                    onClick={() => {
                        goToHomePages();
                    }}
                >返回首页</Button>
            </div>
        </>
    );
}

export default ErrorPages;
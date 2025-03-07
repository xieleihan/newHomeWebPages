// 导入样式
import styles from '../../../../style/home/PersonalProfile.module.scss';

// 导入React
import React, { useEffect, useRef, useState } from "react";

// 导入waterCode
import waterCode from "../../../../utils/waterCode";

// 导入图片
import avater from "../../../../assets/images/avater.png";

// 导入Antd design组件
import { Button, ButtonProps,message } from "antd";
import { GithubOutlined, AntDesignOutlined, WechatOutlined } from "@ant-design/icons";

// 导入本地请求
import { get } from '../../../../api';

function PersonalProfile() {
    // 读取canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // 创建React变量
    const [buttonSize, setButtonSize] = useState(getButtonSize());

    // 创建消息提示
    const [messageApi,contextHolder] = message.useMessage();

    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

    // 创建技术栈接口
    interface TechnologyStackItem {
        label1: {
            fileName: string;
            bgColor: string;
        };
        label2: {
            fileName: string;
            bgColor: string;
        };
    }

    // 创建技术栈变量
    const [technologyStack, setTechnologyStack] = useState<{ data: TechnologyStackItem[] }>({ data: [] });
    

    function getButtonSize(): ButtonProps['size'] {
        if (window.innerWidth < 500) return 'small';
        if (window.innerWidth < 800) return 'middle';
        return 'large';
    }

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

    useEffect(() => {
        const handleResize = () => setButtonSize(getButtonSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        get('/json/technologyStack.json')
            .then((res) => {
                setTechnologyStack(res);
            })
            .catch(() => {
                // 导入错误的messages
                error('图片加载错误');
            }
            );
    }, []);

    return (
        <>
            {contextHolder}
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
                            <Button color="default" variant="solid" size={buttonSize}><GithubOutlined />Github</Button>
                            <Button color="primary" variant="solid" size={buttonSize}><AntDesignOutlined />Blog</Button>
                            <Button color="cyan" variant="solid" size={buttonSize}><WechatOutlined />WeChat</Button>
                        </div>
                    </div>
                    <div className={styles.rightBottom}>
                        <p>技术栈:</p>
                        <div className={styles.technologyStackBox}>
                            <div className={styles.technologyStackBoxContainer}>
                                {
                                    technologyStack.data.map((item, index) => {

                                        const icon1 = `/src/assets/icon/svg/${item.label1.fileName}.svg`;
                                        const icon2 = `/src/assets/icon/svg/${item.label2.fileName}.svg`;

                                        return (
                                            <React.Fragment key={`${item.label1.fileName}`}>
                                                <div key={index} className={styles.technologyStackItem}>
                                                    {icon1 && <img loading='lazy' style={
                                                        {
                                                            backgroundColor: item.label1.bgColor,
                                                        }
                                                    } className={styles.icon} src={icon1} alt={item.label1.fileName} />}
                                                    {icon2 && <img loading='lazy' style={
                                                        {
                                                            backgroundColor: item.label2.bgColor,
                                                        }
                                                    } className={styles.icon} src={icon2} alt={item.label2.fileName} />}
                                                </div>
                                            </React.Fragment>
                                        );
                                    }
                                    )
                                }
                                {
                                    technologyStack.data.map((item, index) => {

                                        const icon1 = `/src/assets/icon/svg/${item.label1.fileName}.svg`;
                                        const icon2 = `/src/assets/icon/svg/${item.label2.fileName}.svg`;

                                        return (
                                            <React.Fragment key={`${item.label2.fileName}`}>
                                                <div key={index} className={styles.technologyStackItem}>
                                                    {icon1 && <img loading='lazy' style={
                                                        {
                                                            backgroundColor: item.label1.bgColor,
                                                        }
                                                    } className={styles.icon} src={icon1} alt={item.label1.fileName} />}
                                                    {icon2 && <img loading='lazy' style={
                                                        {
                                                            backgroundColor: item.label2.bgColor,
                                                        }
                                                    } className={styles.icon} src={icon2} alt={item.label2.fileName} />}
                                                </div>
                                            </React.Fragment>
                                        );
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PersonalProfile;
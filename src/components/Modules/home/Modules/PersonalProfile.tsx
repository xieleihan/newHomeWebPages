// 导入样式
import styles from '../../../../style/home/PersonalProfile.module.scss';

// 导入React
import { useEffect, useRef, useState } from "react";

// 导入waterCode
import waterCode from "../../../../utils/waterCode";

// 导入图片
import avater from "../../../../assets/images/avater.png";
import master_wechat from "../../../../assets/images/master_wechat.jpg";

import photo_pocket_1 from '../../../../assets/images/photo-pocket-1.webp';
import photo_pocket_2 from '../../../../assets/images/photo-pocket-2.webp';
import photo_pocket_3 from '../../../../assets/images/photo-pocket-3.webp';
import photo_pocket_4 from '../../../../assets/images/photo-pocket-4.webp';
import photo_pocket_5 from '../../../../assets/images/photo-pocket-5.webp';

// 导入Antd design组件
import { Button, ButtonProps, message, Spin, Skeleton, Modal, Drawer } from "antd";
import { GithubOutlined, AntDesignOutlined, WechatOutlined } from "@ant-design/icons";

// 导入技术栈接口
import { getTechnologyStack, verifyIsFriend } from "../../../../api/request";

// 引入自定义组件
import PasswordInput from '../../../../hook/PasswordInput';
import MagicCard from '../../../../hook/MagicCard';

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

interface MagicCardProps { 
    picUrl: string;
    picScr: string;
    alt: string;
}

function PersonalProfile({ userAgentWidth, userAgent }: HomecontentComProps) {
    // 读取canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // 创建React变量
    const [buttonSize, setButtonSize] = useState(getButtonSize());

    // 创建消息提示
    const [messageApi, contextHolder] = message.useMessage();
    const [isWechatModalOpen, setIsWechatModalOpen] = useState(false);
    const [isWechatDrawer, setIsWechatDrawer] = useState(false);
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');
    const [isMaster, setIsMaster] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [magicCardPic, setMagicCardPic] = useState<Array<MagicCardProps>>([{picScr: photo_pocket_1, picUrl: photo_pocket_1, alt: 'photo-pocket-1'}, {picScr: photo_pocket_2, picUrl: photo_pocket_2, alt: 'photo-pocket-2'}, {picScr: photo_pocket_3, picUrl: photo_pocket_3, alt: 'photo-pocket-3'}, {picScr: photo_pocket_4, picUrl: photo_pocket_4, alt: 'photo-pocket-4'}, {picScr: photo_pocket_5, picUrl: photo_pocket_5, alt: 'photo-pocket-5'}]);

    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(userAgentWidth);
            setAgentName(userAgent);
        };

        window.addEventListener('resize', handleResize);

        // 初始化
        setWidth(userAgentWidth);
        setAgentName(userAgent);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [userAgentWidth, userAgent])

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

    const showWechatModal = () => {
        setIsWechatModalOpen(true);
    };

    const handleOk = () => {
        setIsWechatModalOpen(false);
        const deeplink = 'weixin://dl/chat?username=SouthAki';
        window.open(deeplink);
    };

    const handleCancel = () => {
        setIsWechatModalOpen(false);
        if (!isMaster) {
            showDrawer();
        }
    };

    const showDrawer = () => {
        setIsWechatDrawer(true);
    };

    const onClose = () => {
        setIsWechatDrawer(false);
    };

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
        getTechnologyStack({})
            .then((res) => {
                setTechnologyStack(res);
            }).catch(() => {
                error('图片加载错误');
            })
    }, []);

    const verify = (val: number | string) => {
        verifyIsFriend({ password: val }).then((res) => {
            const str = JSON.stringify(res);
            const obj = JSON.parse(str);
            console.log(obj);
            if (obj.code === 200) {
                messageApi.open({
                    type: 'success',
                    content: '验证成功,欢迎认识的朋友~',
                });
                setIsWechatDrawer(false);
                setIsMaster(true);
                setImgUrl(import.meta.env.VITE_BASE_API + obj.imgUrl);
                setIsWechatModalOpen(true);
            } else {
                error(obj.message || '验证失败,请重新输入');
            }
        }).catch(() => {
            error('验证失败,请重新输入');
        });
    }

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
                            <Button color="cyan" variant="solid" size={buttonSize} onClick={showWechatModal}><WechatOutlined />WeChat</Button>
                        </div>
                    </div>
                    <div className={styles.rightBottom}>
                        <p className={styles.title}>技术栈:</p>
                        <Spin spinning={technologyStack.data.length === 0} tip="Loading...">
                            <div className={styles.technologyStackBox}>
                                <div className={styles.technologyStackBoxContainer}>
                                    {[...technologyStack.data, ...technologyStack.data].map((item, index) => {

                                        const icon1 = `/src/assets/icon/svg/${item.label1.fileName}.svg`;
                                        const icon2 = `/src/assets/icon/svg/${item.label2.fileName}.svg`;

                                        return (
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
                                        );
                                    }
                                    )}
                                </div>
                            </div>
                        </Spin>
                        <p className={styles.title}>探索我的世界:</p>
                        <div className={styles.desc}>
                            {/* <Skeleton active title={false}></Skeleton> */}
                            <MagicCard pic={magicCardPic} />
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                title="我的WeChat"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isWechatModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={
                    <span
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止冒泡
                            setIsWechatModalOpen(false);
                        }}
                    >
                        X
                    </span>
                }
                okText='一键添加'
                cancelText={isMaster ? '关闭' : '还有一个微信'}
            >
                <img style={{ width: '100%' }} loading='lazy' src={isMaster ? imgUrl : master_wechat} alt="微信二维码" />
            </Modal>
            <Drawer
                title="我的WeChat"
                placement={agentName === 'pc' && width > 768 ? 'right' : 'bottom'}
                onClose={onClose}
                open={isWechatDrawer}
                height={agentName === 'pc' && width > 768 ? '100%' : 450}
            >
                <PasswordInput isOpenSafeKeyword length={6} onComplete={(val) => {
                    console.log('输入完成:', val)
                    verify(val);
                }} includeNumbers width={width} userAgent={agentName} />
            </Drawer>
        </>
    );
}

export default PersonalProfile;
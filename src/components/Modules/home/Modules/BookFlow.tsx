// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";

// 导入样式
import styles from '../../../../style/home/BookFlow.module.scss';

// 导入React
import { useEffect,useState } from "react";

// 导入Antd design组件
import { Button,message,Spin } from 'antd';

// 导入Swiper
// import { Swiper,SwiperSlide } from 'swiper/react';

// 导入请求
import { getBookFlowInfo } from "../../../../api/request";

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

// 导入React
import React from 'react';

// 导入React Router
import { useNavigate } from 'react-router-dom';

// 导入图片
import articleNight from '../../../../assets/images/article-bg-night.webp';

function BookFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    // 导入React变量
    const [bookArray, setBookArray] = useState<Array<any>>([]);
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');
    const [countItem, setCountItem] = useState<number>(4);
    
    // 创建消息提醒变量
    const [messageApi, contextHolder] = message.useMessage();
    
    // 创建错误提示
    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

    // 生命周期,发起请求部分
    useEffect(() => {
        getBookFlowInfo({})
            .then((res) => {
                setBookArray(res.data);
            }).catch(() => {
                error('请求失败');
            })
    }, []);

    // 创建生命周期
    useEffect(() => {
        const handleResize = () => {
            setWidth(userAgentWidth);
            setAgentName(userAgent);
        };

        window.addEventListener('resize', handleResize);

        // 初始化
        setWidth(userAgentWidth);
        setAgentName(userAgent);

        if (width > 375 && width <= 500) {
            setCountItem(4);
        } else if (width > 500 && width <= 768) { 
            setCountItem(6);
        }

        // 清除事件监听
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [userAgentWidth, userAgent]);

    // 获取随机元素数组
    function getRandomItems<T>(array: T[], count: number): T[] {
        if (array.length <= count) return array; // 如果数组元素不足，直接返回全部
        const shuffled = [...array].sort(() => Math.random() - 0.5); // 打乱数组
        return shuffled.slice(0, count); // 取前 count 个
    }

    const navigate = useNavigate();

    return (
        <>
            <ComponentsLayout
                title="个人书库"
                isOpenPagination={false}
                backgroundImage={articleNight}
                container={
                    <>
                        {contextHolder}
                        <div className={styles.bookBox}>
                            <p className={styles.smallTitle}>点击看看</p>
                            <div className={styles.content}>
                                <Spin size="large" spinning={bookArray.length === 0}>
                                </Spin>
                                <>
                                        <div className={styles.swiperBox}>
                                            {
                                                // 判断是否电脑端和宽度是否高于768
                                                agentName === 'pc' || width > 768 ? 
                                                <>
                                                
                                                </> :
                                                    <>
                                                        {
                                                            bookArray.length >= 3 && bookArray.length > 0
                                                            ?
                                                                <div className={styles.phone}>
                                                                    {
                                                                    getRandomItems(bookArray, countItem).map((item, index) => {
                                                                            return (
                                                                                <React.Fragment key={index}>
                                                                                    <a className={styles.swiperItemLink} href={item.linkHtml} target="_blank" rel="noreferrer">
                                                                                        <div className={styles.swiperItem}>
                                                                                            <img className={styles.bookImg} loading="lazy" src={item.imgUrl} alt="图书照片" />
                                                                                            <div className={styles.bookInfo}>
                                                                                                {/* 书名 */}
                                                                                                <p className={styles.bookName}>
                                                                                                    {item.bookName}
                                                                                                </p>
                                                                                                {/* 作者和描述 */}
                                                                                                <p className={styles.bookAuthorAndDesc}>
                                                                                                    {item.author}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </React.Fragment>
                                                                            );
                                                                        })
                                                                    }
                                                                </div>
                                                            :
                                                                <>
                                                                    <p className={styles.bookArrayNull}>书库为空</p>
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </div>
                                </>
                            </div>
                            <div className={styles.btnBox}>
                                <Button onClick={() => {
                                    navigate('/bookstore');
                                }} className={styles.lookMore}>查看更多</Button>
                            </div>
                        </div>
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default BookFlow;
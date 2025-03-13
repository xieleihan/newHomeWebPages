//  导入样式
import styles from '../../style/BookstorePages.module.scss';
import HomeHeaderStyles from '../../style/layout/HeaderComponents.module.scss';
import HomeFooterStyles from '../../style/layout/FooterComponents.module.scss';

// 导入Header
import HomeheaderCom from '../../components/Modules/home/HomeheaderCom';
import HomefooterCom from '../../components/Modules/home/HomefooterCom';

// 读取Redux中的数值
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

// 导入React
import React, { useState, useEffect } from 'react';

// 导入请求
import { getBookFlowInfo } from '../../api/request';

// 导入Antd design组件
import { Spin, message } from 'antd';

function BookstorePages() {
    // 创建React变量
    const [userWidth, setUserWidth] = useState<number>(0);
    const [bookArray, setBookArray] = useState<Array<any>>([]);

    // 初始化Redux
    const userAgentWidth = useSelector((state: RootState) => state.windowsSystemOptions.userAgentWidth);

    // 创建消息提醒变量
    const [messageApi, contextHolder] = message.useMessage();
    // 创建错误提示
    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

    // 创建生命周期
    useEffect(() => {
        setUserWidth(userAgentWidth);
    }, [userAgentWidth])

    useEffect(() => {
        getBookFlowInfo({}).then((res) => {
            setBookArray(res.data);
            console.log(userWidth)
        }).catch(() => {
            error('请求失败');
        })
    },[])

    return (
        <>
            <section className={styles.bookStore}>
                {/* @ts-expect-error: HomeheaderCom does not have type definitions */}
                <HomeheaderCom styles={HomeHeaderStyles} />
                <section className={styles.bookStoreContent}>
                    {contextHolder}
                    <Spin size="large" spinning={bookArray.length === 0} />
                    
                    <div className={styles.render}>
                        {
                            bookArray.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <a className={styles.renderItemLink} href={item.linkHtml} target="_blank" rel="noreferrer">
                                            <div className={styles.renderItem}>
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
                </section>
                {/* @ts-expect-error: HomefooterCom does not have type definitions */}
                <HomefooterCom styles={HomeFooterStyles} />
            </section>
        </>
    );
}

export default BookstorePages;
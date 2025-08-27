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
import LazyImage from '../../hook/LazyImage';

// 导入React Router
import { Outlet, Link, useMatch } from 'react-router-dom';

function BookstorePages() {
    // 创建React变量
    const [userWidth, setUserWidth] = useState<number>(0);
    const [bookArray, setBookArray] = useState<Array<any>>([]);
    const [clickItem, setClickItem] = useState({});

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
    }, [])
    
    // 判断当前的页面是否是reader二级页面
    const isReaderPage = useMatch('/bookstore/reader');

    return (
        <>
            <section className={styles.bookStore}>
                {/* @ts-expect-error: HomeheaderCom does not have type definitions */}
                <HomeheaderCom styles={HomeHeaderStyles} />
                <section className={styles.bookStoreContent}>
                    {contextHolder}
                    {/* 判断当前页面是否在二级页面 */}
                    {!isReaderPage && 
                        (
                        <>
                            <Spin size="large" spinning={bookArray.length === 0} />

                            <div className={styles.render}>
                                {
                                    bookArray.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Link onClick={() => {
                                                    setClickItem(item);
                                                }} className={styles.renderItemLink} to={`/bookstore/reader?bookId=${item.linkHtml}`}  rel="noreferrer">
                                                    <div className={styles.renderItem}>
                                                        {/* <img className={styles.bookImg} loading="lazy" src={item.imgUrl} alt="图书照片" /> */}
                                                        <LazyImage className={styles.bookImg} src={item.imgUrl} alt="图书照片" />
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
                                                </Link>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </>
                        )
                    }

                    <Outlet context={clickItem} />
                </section>
                {/* @ts-expect-error: HomefooterCom does not have type definitions */}
                <HomefooterCom styles={HomeFooterStyles} />
            </section>
        </>
    );
}

export default BookstorePages;
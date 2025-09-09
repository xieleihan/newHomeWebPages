// 导入Antd
import { Layout } from 'antd';

// 导入React
import { useState, useRef,useEffect } from 'react';

import { gsap } from 'gsap';

// 导入图片
import Settings from '../../../assets/icon/setting.svg';
import Sider from '../../../assets/icon/sider.svg';
import Translate from '../../../assets/icon/translate.svg';
import avater from '../../../assets/images/avater.png';
import {Link} from "react-router-dom";

interface HomeheaderComProps {
    styles: {
        header: string;
        left: string;
        avater: string;
        title: string;
        right: string;
        nav: string;
        item: string;
        operateBox: string;
        icon: string;
        popup: string;
        popupItem: string;
        iconRotate: string;
    };
}

function HomeheaderCom({styles}: HomeheaderComProps) {
    // 创建React变量
    const [visible, setVisible] = useState(false); // 控制弹出菜单的显示隐藏
    const iconSider = useRef<HTMLImageElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const { Header } = Layout;

    useEffect(() => {
        let lastScrollTop = 0; // 上一次滚动位置

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (!headerRef.current) return;

            if (currentScroll > lastScrollTop) {
                // 向下滚动 => 隐藏
                gsap.to(headerRef.current, {
                    y: -80, // 向上移动 header (隐藏)
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                // 向上滚动 => 显示
                gsap.to(headerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 防止负数
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 菜单元素
    const menuItem = [
        {
            key: 'home',
            name: '首页'
        },
        {
            key: 'project',
            name: '项目'
        },
        {
            key: 'about',
            name: '关于',
            link: '/about'
        }
    ]

    return (
        <>
            <Header ref={headerRef} className={styles.header}>
                <div className={styles.left}>
                    <img className={styles.avater} loading="lazy" src={avater} alt="avater" />
                    <h1 className={styles.title}>南秋SouthAki的个人主页</h1>
                </div>
                <nav className={styles.right}>
                    <ul className={styles.nav}>
                        {
                            menuItem.map((item,index) => {
                                return (
                                    <li key={index} className={styles.item}>
                                        <span>{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.operateBox}>
                        <img onClick={() => {
                            setVisible(!visible);
                            if(iconSider.current){
                                if(!visible){
                                    iconSider.current.classList.add(styles.iconRotate);
                                } else {
                                    iconSider.current.classList.remove(styles.iconRotate);
                                }
                            }
                        }} ref={iconSider} loading="lazy" className={styles.icon} src={Sider} alt="侧边栏" />
                        <Link to="/settings">
                            <img loading="lazy" className={styles.icon} src={Settings} alt="设置" />
                        </Link>
                        <img loading="lazy" className={styles.icon} src={Translate} alt="翻译" />
                    </div>
                </nav>

                <ul className={styles.popup} style={visible?{
                    transform: 'scaleY(1)',
                    opacity: 1
                } : {
                    transform: 'scaleY(0)',
                    opacity: 0
                }}>
                    {
                        menuItem.map((item,index) => {
                            return (
                                <li key={index} className={styles.popupItem}>{item.name}</li>
                            )
                        })
                    }
                </ul>
            </Header>
        </>
    );
}

export default HomeheaderCom;
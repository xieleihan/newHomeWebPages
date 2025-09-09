// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";
import { useEffect, useState,useRef } from "react";
import LiquidglassCard from "../../../../hook/LiquidglassCard";
import LiquidglassArrow from "../../../../hook/LiquidglassArrow";
import styles from '../../../../style/home/DocumentFlow.module.scss';
// 导入gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

import startImg from '../../../../assets/images/article-bg-day.webp';

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

// 文档的展示
function DocumnetFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');

    // card的容器
    const cardContainerRefs = useRef<HTMLDivElement[]>([]);

    // dockItem的容器
    const contentBoxRef = useRef<HTMLDivElement>(null);
    const dockItemRefs = useRef<HTMLImageElement[]>([]);

    const dataArray = [
        {
            index: 0,
            title: '项目文档',
            content: '包含前端、后端、数据库等项目的设计文档、技术文档和使用文档。',
            imageUrl: 'https://picsum.photos/3840/2160?random=1',
            linkUrl: '/document?id=1',
            altText: 'Document 1'
        },
        {
            index: 1,
            title: '学习笔记',
            content: '涵盖各种技术栈、编程语言和工具的学习笔记和教程。',
            imageUrl: 'https://picsum.photos/3840/2160?random=2',
            linkUrl: '/document?id=2',
            altText: 'Document 2'
        },
        {
            index: 2,
            title: '个人随笔',
            content: '记录个人的思考、见解和生活点滴的随笔文章。',
            imageUrl: 'https://picsum.photos/3840/2160?random=3',
            linkUrl: '/document?id=3',
            altText: 'Document 3'
        },
        {
            index: 3,
            title: '技术文章',
            content: '分享技术趋势、最佳实践和行业动态的技术文章。',
            imageUrl: 'https://picsum.photos/3840/2160?random=4',
            linkUrl: 'https://example.com/doc4',
            altText: 'Document 4'
        },
        {
            index: 4,
            title: '开源项目',
            content: '介绍和分享个人或团队的开源项目和代码库。',
            imageUrl: 'https://picsum.photos/3840/2160?random=5',
            linkUrl: 'https://example.com/doc5',
            altText: 'Document 5'
        },
        {
            index: 5,
            title: '设计文档',
            content: '展示UI/UX设计、原型和用户体验相关的设计文档。',
            imageUrl: 'https://picsum.photos/3840/2160?random=6',
            linkUrl: 'https://example.com/doc6',
            altText: 'Document 6'
        }
    ]
    
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

    useEffect(() => {
        // 为每个card容器创建滚动触发动画
        cardContainerRefs.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card, 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <>
            <ComponentsLayout
                title="个人文档"
                titleColor="white"
                titleSize={.3}
                isOpenPagination={false}
                backgroundImage={startImg}
                enableGsap={false}
                container={
                    <>
                        <section className={styles.container}>
                            {
                                dataArray.map((item, index) => (
                                    index <= 2 ? (
                                        <div key={item.index} ref={el => cardContainerRefs.current[index] = el!}>
                                            <LiquidglassCard
                                                index={item.index}
                                                title={item.title}
                                                content={item.content}
                                                imageUrl={item.imageUrl}
                                                linkUrl={item.linkUrl}
                                                altText={item.altText}
                                            />
                                        </div>
                                    ) : null
                                ))
                            }
                            <div className={styles.fixedBox}>
                                <div className={styles.control}>
                                    <div className={styles.left}>
                                        <LiquidglassArrow clickfn={() => {
                                            console.log('left clicked');
                                            // 根据容器的宽度,和item的宽度和margin来计算滚动的距离
                                            if (contentBoxRef.current && dockItemRefs.current[0]) {
                                                const item = dockItemRefs.current[0];
                                                const container = contentBoxRef.current;
                                                const itemStyle = getComputedStyle(item);
                                                const scrollAmount = item.offsetWidth + parseFloat(itemStyle.marginRight);
                                                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                                            }
                                        }} direction="left" size={width > 768 && agentName === 'pc' ? 50 : 30} ></LiquidglassArrow>
                                    </div>
                                    <div ref={contentBoxRef} className={styles.contentBox}>
                                        {
                                            dataArray && dataArray.map((item,index) => (
                                                <img ref={el => dockItemRefs.current[index] = el!} className={styles.dockItem} loading="lazy" key={item.index} src={item.imageUrl} alt={item.altText} />
                                            ))
                                        }
                                    </div>
                                    <div className={styles.right}>
                                        <LiquidglassArrow clickfn={() => {
                                            console.log('right clicked');
                                            if (contentBoxRef.current && dockItemRefs.current[0]) {
                                                const item = dockItemRefs.current[0];
                                                const container = contentBoxRef.current;
                                                const itemStyle = getComputedStyle(item);
                                                const scrollAmount = item.offsetWidth + parseFloat(itemStyle.marginRight);
                                                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                                            }
                                        }} direction="right" size={width > 768 && agentName === 'pc' ? 50 : 30} ></LiquidglassArrow>
                                    </div>
                                </div>
                               
                                <section className={styles.SunBar}>
                                </section>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                    <defs>
                                        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                                            <feTurbulence
                                                type="fractalNoise"
                                                baseFrequency="0.008 0.008"
                                                numOctaves="2"
                                                seed="92"
                                                result="noise"
                                            />
                                            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                                            <feDisplacementMap
                                                in="SourceGraphic"
                                                in2="blurred"
                                                scale="77"
                                                xChannelSelector="R"
                                                yChannelSelector="G"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </section>
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default DocumnetFlow;
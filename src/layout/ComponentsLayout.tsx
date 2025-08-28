// 导入样式
import styles from '../style/layout/ComponentsLayout.module.scss';

// 导入Antd design组件
import { Pagination } from "antd";
// 导入GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 引入react
import { useRef, useEffect } from 'react';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 定义Props类型
interface Props {
    title: string;
    titleColor?: string;
    titleSize?: number;
    isOpenPagination?: boolean;
    container: React.ReactNode;
    backgroundImage?: string;
}

function ComponentsLayout({ title, titleColor, titleSize, isOpenPagination, container, backgroundImage }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelinesRef = useRef<gsap.core.Timeline[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const elements = sectionRef.current.querySelectorAll(`.${styles.layoutContainer} > *`);

        // 清理之前的动画
        timelinesRef.current.forEach(tl => tl.kill());
        timelinesRef.current = [];

        // 为每个元素创建独立的时间线
        elements.forEach((el, index) => {
            const timeline = gsap.timeline({ paused: true });

            // 根据索引选择不同的进入方向
            const directions = [
                { x: -100, y: 0 },
                { x: 100, y: 0 },
                { x: 0, y: 100 },
                { x: 0, y: -100 }
            ];

            const direction = directions[index % directions.length];

            // 初始状态
            gsap.set(el, {
                opacity: 0,
                x: direction.x,
                y: direction.y,
                scale: 0.8
            });

            timeline.to(el, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });

            timelinesRef.current.push(timeline);
        });

        // 创建 ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reset", // 关键修改：使用 reset
            onEnter: () => {
                // 播放所有动画，添加延迟创造依次进入效果
                timelinesRef.current.forEach((tl, index) => {
                    tl.play(0); // 从头开始播放
                });
            },
            onLeaveBack: () => {
                // 离开时重置所有元素到初始状态
                elements.forEach((el, index) => {
                    const directions = [
                        { x: -100, y: 0 },
                        { x: 100, y: 0 },
                        { x: 0, y: 100 },
                        { x: 0, y: -100 }
                    ];
                    const direction = directions[index % directions.length];

                    gsap.set(el, {
                        opacity: 0,
                        x: direction.x,
                        y: direction.y,
                        scale: 0.8
                    });
                });
            }
        });

        return () => {
            // 清理函数
            scrollTrigger.kill();
            timelinesRef.current.forEach(tl => tl.kill());
        };
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                className={styles.componentsLayout}
                style={backgroundImage ? {
                    background: `url(${backgroundImage}) no-repeat center center`,
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                } : {}}
            >
                {/* 标题 */}
                <h2
                    style={titleColor || titleSize ? {
                        color: titleColor || 'black',
                        fontSize: titleSize ? `${titleSize}rem` : '2rem'
                    } : { color: 'black' }}
                    className={styles.layoutTitle}
                >
                    {title}
                </h2>
                {/* 内容 */}
                <div className={styles.layoutContainer}>
                    {container}
                </div>
                {/* 分页 */}
                {isOpenPagination && (
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `Total ${total} items`}
                        align="end"
                        defaultCurrent={1}
                        total={50}
                    />
                )}
            </section>
        </>
    );
}

export default ComponentsLayout;
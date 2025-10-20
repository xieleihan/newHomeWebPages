// LazyLoadWrapper.tsx
import { useEffect, useRef, useState } from "react";

interface LazyLoadWrapperProps {
    children: React.ReactNode;
    rootMargin?: string; // 可自定义触发阈值
    minHeight?: string;
}

/**
 * 懒加载 可以在没有距离视口50px之前不加载DOM元素
 * @param children react节点
 * @param rootMargin 触发阈值
 * @param minHeight 最小高度
 * @returns Html React节点
 */
export default function LazyLoadWrapper({
    children,
    rootMargin = "50px",
    minHeight
}: LazyLoadWrapperProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // 一旦出现就停止观察
                    }
                });
            },
            { root: null, rootMargin }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <>
            <section style={{ minHeight: minHeight ?? '100dvh', width: '100dvw', minWidth: '100%' }} ref={ref}>{isVisible ? children : null}</section>
        </>
    );
}

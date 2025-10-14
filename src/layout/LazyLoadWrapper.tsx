// LazyLoadWrapper.tsx
import { useEffect, useRef, useState } from "react";

interface LazyLoadWrapperProps {
    children: React.ReactNode;
    rootMargin?: string; // 可自定义触发阈值
}

export default function LazyLoadWrapper({
    children,
    rootMargin = "50px",
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

    return <section style={{minHeight: '100dvh',width: '100dvw',minWidth:'100%'}} ref={ref}>{isVisible ? children : null}</section>;
}

import { useEffect, useRef, useState } from "react";
import styles from './styles/LazyImage.module.scss';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
}

function LazyImage({ src, alt, className }: LazyImageProps) {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '100px' }
        );

        if (placeholderRef.current) {
            observer.observe(placeholderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // 骨架屏应该在进入视口但未加载完成时显示
    const showSkeleton = inView && !loaded;
    // 图片应该在进入视口后显示
    const showImage = inView;

    return (
        <div ref={placeholderRef} className={styles.imgWrapper}>
            {showSkeleton && <div className={styles.skeleton}></div>}
            {showImage && (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={() => setLoaded(true)}
                    style={loaded ? {} : { display: 'none' }}
                    
                />
            )}
        </div>
    );
}

export default LazyImage;
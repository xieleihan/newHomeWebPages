import styles from './styles/LiquidglassCard.module.scss';

interface LiquidglassCardProps { 
    index: number; // 用于判断奇偶索引
    title?: string; // 标题
    content?: string; // 内容
    imageUrl?: string; // 图片地址
    linkUrl?: string; // 链接地址
    altText?: string; // 图片替代文本
    clickHandler?: () => void; // 点击事件处理函数
    children?: React.ReactNode; // 子组件
}

function LiquidglassCard({ index, title, content, imageUrl, linkUrl, altText, clickHandler, children }: LiquidglassCardProps) { 
    const defaultImage = `https://picsum.photos/3840/2160?random=${Math.floor(Math.random() * 1000)}`; // 默认图片地址
    const isEven = index % 2 === 0;

    const handleClick = () => {
        if (clickHandler) {
            clickHandler();
        }
        if (linkUrl) {
            window.location.href = linkUrl;
        }
    };
    return (
        <>
            <section
                className={styles.LiquidglassCard}
                onClick={handleClick}
            >
                {isEven ? (
                    <>
                        <div className={styles.image}>
                            <img src={imageUrl || defaultImage} alt={altText || 'preview'} />
                        </div>
                        <div className={styles.content}>
                            <h2>{title}</h2>
                            <p>{content}</p>
                            {children}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.content}>
                            <h2>{title}</h2>
                            <p>{content}</p>
                            {children}
                        </div>
                        <div className={styles.image}>
                            <img src={imageUrl || defaultImage} alt={altText || 'preview'} />
                        </div>
                    </>
                )}
            </section>
        </>
    );
}

export default LiquidglassCard;
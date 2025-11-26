import styles from './styles/MagicCard.module.scss';
import { useState } from 'react';

function MagicCard({ pic }: { pic: Array<{ picUrl: string; picScr: string; alt: string }> }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        // 如果点击的是已选中的卡片，则取消选中
        if (hoveredIndex === index) {
            setHoveredIndex(null);
            return;
        }

        // 选中新的卡片，保持动画状态直到再次点击
        setHoveredIndex(index);
    };

    return (
        <>
            <section className={styles.magicCardBox}>
                {pic.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.magicItem} ${hoveredIndex === index ? styles.hovered : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <img src={item.picScr} loading='lazy' alt={item.alt} className={styles.magicCardPic} />
                    </div>
                ))}
            </section>
        </>
    )
}

export default MagicCard;
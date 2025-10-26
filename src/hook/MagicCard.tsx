import styles from './styles/MagicCard.module.scss';

function MagicCard({pic}: {pic: Array<{picUrl: string; picScr: string; alt: string}>}) {
    
    return (
        <>
            <section className={styles.magicCardBox}>
                {pic.map((item, index) => (
                    <div key={index} className={styles.magicItem}>
                        <img src={item.picScr} loading='lazy' alt={item.alt} className={styles.magicCardPic} />
                    </div>
                ))}
            </section>
        </>
    )
}

export default MagicCard;
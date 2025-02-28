// 导入样式
import styles from '../style/ErrorPages.module.scss';

// 导入图片
import error from '../assets/icon/404.svg';

function ErrorPages() {
    return (
        <>
            <div className={styles.errorPages}>
                <img loading='lazy' className={styles.errorImg} src={error} alt="404" />
                <p className={styles.errorWord}>
                    404 Not Found
                </p>
                <p className={styles.errorDesc}>
                    你来到无人问津的荒漠
                </p>
            </div>
        </>
    );
}

export default ErrorPages;
// import { Form } from "antd";

// 导入样式
import styles from '../style/ContactPages.module.scss';

// 导入组件
import ReturnlastpagesBtnicon from '../components/ReturnlastpagesBtnicon';

// 导入图片
import hello from '../assets/icon/hello.svg';

function ContactPages() {
    return (
        <>
            <ReturnlastpagesBtnicon />
            <div className={styles.contact}>
                <div className={styles.container}>
                    <img className={styles.hello} src={hello} alt="打招呼" />
                </div>
            </div>
        </>
    );
}

export default ContactPages;
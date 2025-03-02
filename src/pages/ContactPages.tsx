// import { Form } from "antd";

// 导入样式
import styles from '../style/ContactPages.module.scss';

// 导入组件
import ReturnlastpagesBtnicon from '../components/ReturnlastpagesBtnicon';

function ContactPages() {
    return (
        <>
            <ReturnlastpagesBtnicon />
            <div className={styles.contact}></div>
        </>
    );
}

export default ContactPages;
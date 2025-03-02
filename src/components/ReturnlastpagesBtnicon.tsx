// 导入图标
import { LeftOutlined } from '@ant-design/icons';

// 导入样式
import styles from '../style/Modules/ReturnlastpagesBtnicon.module.scss';

// 导入React Router

function ReturnlastpagesBtnicon() {
    return (
        <>
            <div className={styles.returnlastpagesBtnicon}>
                <LeftOutlined />
            </div>
        </>
    );
}

export default ReturnlastpagesBtnicon;
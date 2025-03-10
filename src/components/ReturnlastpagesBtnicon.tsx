// 导入图标
import { LeftOutlined } from '@ant-design/icons';

// 导入样式
import styles from '../style/Modules/ReturnlastpagesBtnicon.module.scss';

// 导入React Router
import { useNavigate } from 'react-router-dom'; 

function ReturnlastpagesBtnicon() {
    // 初始化导航
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => {
                    navigate(-1);
                }}
                className={styles.returnlastpagesBtnicon}
            >
                <LeftOutlined />
            </div>
        </>
    );
}

export default ReturnlastpagesBtnicon;
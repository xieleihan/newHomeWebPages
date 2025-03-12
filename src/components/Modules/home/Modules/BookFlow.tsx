// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";

// 导入样式
import styles from '../../../../style/home/BookFlow.module.scss';

// 导入React
import { useEffect } from "react";

// 导入Antd design组件
import {Button} from 'antd';

function BookFlow() {
    // 创建生命周期
    useEffect(() => {
        
    }, []);

    return (
        <>
            <ComponentsLayout
                title="个人书库"
                isOpenPagination={false}
                container={
                    <>
                        <div className={styles.bookBox}>
                            <p className={styles.smallTitle}>点击看看</p>
                            <div className={styles.content}>

                            </div>
                            <Button>查看更多</Button>
                        </div>
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default BookFlow;
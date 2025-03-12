// 导入样式
import styles from '../style/layout/ComponentsLayout.module.scss';

// 导入Antd design组件
import { Pagination } from "antd";

// 定义Props类型
interface Props {
    title: string;
    isOpenPagination?: boolean;  // 可选
    container: React.ReactNode;
}

/**
 * 布局函数组件
 * @param {string} title 标题 
 * @param {boolean} isOpenPagination 是否开启分页
 * @param {HTMLElement} container 容器
 * @returns JSX.Element
 */
function ComponentsLayout({ title, isOpenPagination, container }: Props) {
    return (
        <>
            <section className={styles.componentsLayout}>
                {/* 标题 */}
                <h2 className={styles.layoutTitle}>{ title }</h2>
                {/* 内容 */}
                <div className={styles.layoutContainer}>
                    { container }
                </div>
                {/* 分页 */}
                {
                    isOpenPagination ? (
                        <>
                            <Pagination
                                showSizeChanger
                                showQuickJumper
                                showTotal={(total) => `Total ${total} items`} align="end"
                                defaultCurrent={1}
                                total={50}
                            />
                        </>
                    ) : null
                }
            </section>
        </>
    );
}

export default ComponentsLayout;
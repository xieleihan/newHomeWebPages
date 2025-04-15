// 导入样式
import styles from '../style/layout/ComponentsLayout.module.scss';

// 导入Antd design组件
import { Pagination } from "antd";

// 定义Props类型
interface Props {
    title: string;
    titleColor?: string;  // 可选
    titleSize?: number;  // 可选
    isOpenPagination?: boolean;  // 可选
    container: React.ReactNode;
    backgroundImage?: string;  // 可选
}

/**
 * 布局函数组件
 * @param {string} title 标题 
 * @param {string} titleColor 标题颜色
 * @param {number} titleSize 标题大小
 * @param {boolean} isOpenPagination 是否开启分页
 * @param {HTMLElement} container 容器
 * @param {string} backgroundImage 背景图片
 * @returns JSX.Element
 */
function ComponentsLayout({ title, titleColor,titleSize, isOpenPagination, container, backgroundImage}: Props) {
    return (
        <>
            <section
                className={styles.componentsLayout}
                style={backgroundImage ? { background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: 'cover', backgroundAttachment : 'fixed' } : {} }
            >
                {/* 标题 */}
                <h2 style={titleColor || titleSize ? { color: `${titleColor}`,fontSize:`${titleSize}rem` } : { color: 'black' }} className={styles.layoutTitle}>{ title }</h2>
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
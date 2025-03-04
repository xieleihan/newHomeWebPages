// 导入样式
import styles from '../../../../style/home/WebsiteinfoCom.module.scss';

// 导入图片
import react from '../../../../assets/icon/react.svg';
import sass from '../../../../assets/icon/Sass.svg';
import typescript from '../../../../assets/icon/typescript.svg';
import antd from '../../../../assets/icon/antd.svg';

function WebsiteinfoCom() {
    // 创建图片数组
    const imgArr = [react, sass, typescript, antd];

    return (
        <>
            <div className={styles.websiteInfoCom}>
                <div className={styles.container}>
                    <p>技术栈:</p>
                    {
                        imgArr.map((item, index) => {
                            return (
                                <img key={index} src={item} alt="技术栈图标" />
                            );
                        })
                    }
                    <p>站外联系:</p>
                </div>
            </div>
        </>
    );
}

export default WebsiteinfoCom;
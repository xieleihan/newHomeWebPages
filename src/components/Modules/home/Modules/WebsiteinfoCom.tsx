// 导入样式
import styles from '../../../../style/home/WebsiteinfoCom.module.scss';

// 导入图片
import antd from '../../../../assets/icon/antd.svg';
import wechat from '../../../../assets/icon/WeChat.svg';
import facebook from '../../../../assets/icon/Facebook.svg';
import github from '../../../../assets/icon/GitHub.svg';
import twiiter from '../../../../assets/icon/twiiter_login.svg';

function WebsiteinfoCom() {
    // 创建图片数组
    // 技术栈的图片
    const imgArr = [
        {
            icon: 'https://fastly.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            url: 'https://react.docschina.org/',
            color: 'white',
        },
        {
            icon: 'https://fastly.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
            url: 'https://www.sass.com',
            color: 'white',
        },
        {
            icon: 'https://fastly.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
            url: 'https://www.typescriptlang.org/',
            color: '#5577c5'
        },
        {
            icon: antd,
            url: 'https://ant.design/index-cn',
            color: 'white'
        }
    ];
    // 站外联系的图片
    const websiteoutImgArr = [
        {
            icon: facebook,
            url: 'https://www.facebook.com/',
            color: '#3e4c6f',
        },
        {
            icon: twiiter,
            url: 'https://twitter.com/',
            color: '#6792d3'
        },
        {
            icon: wechat,
            url: 'https://wx.qq.com/',
            color: '#76ba6d'
        },
        {
            icon: github,
            url: 'https://github.com',
            color: '#000000'
        }
    ];

    return (
        <>
            <div className={styles.websiteInfoCom}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <p className={styles.title}>技术栈:</p>
                        {
                            imgArr.map((item, index) => {
                                return (
                                    <a className={styles.aLink} key={index} href={item.url} target="_blank" rel="noreferrer">
                                        <div className={styles.imgBox}>
                                            <img loading='lazy' className={styles.icon} src={item.icon} alt="技术栈图标" />
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>

                    <div className={styles.bottom}>
                        <p className={styles.title}>站外联系:</p>
                        {
                            websiteoutImgArr.map((item, index) => {
                                return (
                                    <a className={styles.aLink} key={index} href
                                        ={item.url} target="_blank" rel="noreferrer">
                                        <div className={styles.imgBox}>
                                            <img loading='lazy' className={styles.icon} src={item.icon} alt="站外联系图标" />
                                        </div>
                                    </a>
                                );
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebsiteinfoCom;
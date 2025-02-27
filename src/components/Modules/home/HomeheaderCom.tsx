// 导入Antd
import { Layout } from 'antd';

// 导入图片
import Settings from '../../../assets/icon/setting.svg';
import Sider from '../../../assets/icon/sider.svg';
import Translate from '../../../assets/icon/translate.svg';

function HomeheaderCom() {
    const { Header } = Layout;

    return (
        <>
            <Header className='header'>
                <div className="left">
                    <img className='avater' loading="lazy" src="https://avatars.githubusercontent.com/u/57227318?v=4" alt="avater" />
                    <h1 className='title'>南秋SouthAki的个人主页</h1>
                </div>
                <nav className="right">
                    <ul className='nav'>
                        <li className='item'>首页</li>
                        <li className='item'>项目</li>
                        <li className='item'>关于</li>
                    </ul>
                    <div className="operateBox">
                        <img loading="lazy" className='icon' src={Sider} alt="侧边栏" />
                        <img loading="lazy" className='icon' src={Settings} alt="设置" />
                        <img loading="lazy" className='icon' src={Translate} alt="翻译" />
                    </div>
                </nav>

                <div className="popup"></div>
            </Header>
        </>
    );
}

export default HomeheaderCom;
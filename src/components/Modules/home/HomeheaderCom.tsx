// 导入Antd
import { Layout,Menu } from 'antd';
import type { MenuProps } from 'antd';

function HomeheaderCom() {
    const { Header } = Layout;

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            label: '首页',
            key: 'mail',
        },
    ]

    return (
        <>
            <Header className='header'>
                <div className="left">
                    <img className='avater' loading="lazy" src="https://avatars.githubusercontent.com/u/57227318?v=4" alt="avater" />
                    <h1 className='title'>南秋SouthAki的个人主页</h1>
                </div>
                <nav className="right">
                    <Menu className='nav' mode="horizontal" items={items} />
                </nav>
            </Header>
        </>
    );
}

export default HomeheaderCom;
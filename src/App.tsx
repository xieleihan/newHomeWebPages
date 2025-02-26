// 导入样式
import './style/App.scss';

// 引入i18n
import './lang/index';
import { useTranslation } from 'react-i18next';

// 引入antd
import { Button, Dropdown } from "antd";
import type { MenuProps } from 'antd';

// 导入图片
import Logo from './assets/icon/peacock_flat.png';
import translate from './assets/icon/translate.svg';

// 导入路由跳转
import { Outlet, useNavigate } from 'react-router-dom';

// 导入React
import { useState } from 'react';

function App() {
  // 创建React变量
  const [isStartPages, setIsStartPages] = useState(true);

  // 创建i18n变量
  const { t, i18n } = useTranslation();

  // 语言切换函数
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // 初始化导航
  const navigate = useNavigate();

  // 创建菜单
  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: '中文',
      onClick: () => {
        changeLanguage('zh');
      }
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => {
        changeLanguage('en');
      }
    }
  ];

  return (
    <>
      <div className="app">
        {
          isStartPages ? (
            <>
              <div className="start">
                <div className="translate">
                  <Dropdown menu={{ items }}>
                    <img onClick={(e) => { e.preventDefault() }} src={translate} alt="" />
                  </Dropdown>
                </div>
                <div className="operate">
                  <img className='logo' src={Logo} alt="" />
                  <p className='title'>
                    {t('startPages.title')}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsStartPages(false);
                      navigate('/home');
                    }}
                  >
                    {t('startPages.enter')}
                  </Button>
                </div>
                <footer className='footer'>
                  Copyright© 2025 SouthAki,All rights reserved.
                </footer>
              </div>
            </>
          ) : (
            // 路由出口
            <Outlet />
          )}
      </div>
    </>
  );
}

export default App;
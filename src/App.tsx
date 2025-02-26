// 导入样式
import './style/App.scss';

// 引入i18n
import './lang/index';
import { useTranslation } from 'react-i18next';

// 引入antd
import { Button } from "antd";

// 导入图片
import Logo from './assets/icon/peacock_flat.png';
import translate from './assets/icon/translate.svg';

// 导入路由跳转
import { Outlet } from 'react-router-dom';

// 导入React
import { useState } from 'react';

function App() {
  // 创建React变量
  const [isStartPages, setIsStartPages] = useState(true);

  const { t } = useTranslation();

  return (
    <>
      <div className="app">
        {
          isStartPages ? (
            <>
              <div className="translate">
                <img src={translate} alt="" />
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
                  }}
                >
                  {t('startPages.enter')}
                </Button>
              </div>
              <footer className='footer'>
                Copyright© 2025 SouthAki,All rights reserved.
              </footer>
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
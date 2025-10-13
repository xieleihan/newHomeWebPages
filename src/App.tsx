// 导入样式
import styles from './style/App.module.scss';

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
import { useState, useEffect } from 'react';

// 导入请求
import { getUserIp } from "./api/request";

// 使用React Redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/index';
import { setIpInfo, setAddressInfo } from './store/generalStore.ts';
import { setUserAgentWidthStore } from './store/Modules/WindowsSystemOptionsStore';

// 引入设备指纹
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { setStorage } from './utils/common.ts';

function App() {
  // 创建React变量
  const [isStartPages, setIsStartPages] = useState(true);

  // 指纹ID
  const [visitorId, setVisitorId] = useState<string>("");

  // 初始化Redux
  const dispatch = useDispatch<AppDispatch>();

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

  // 生命周期创建
  useEffect(() => {
    // 获取用户IP地址
    getUserIp({}).then(async res => {
      let str = JSON.stringify(res);
      let obj = JSON.parse(str);
      let address = obj.adcode.o
      console.warn('当前用户访问的IP地址信息:', obj.ipinfo.text);
      console.warn('当前用户位置信息:', address);
      // 更新Redux
      dispatch(setIpInfo(obj.ipinfo.text));
      dispatch(setAddressInfo(address));
    }).catch(err => {
      console.log('获取用户IP地址失败:', err);
    });
  }, [])

  // 创建生命周期
  useEffect(() => {
    // 定义窗口大小更新函数
    const handleResize = () => {
      dispatch(setUserAgentWidthStore(window.innerWidth));
    };

    // 初始化 userAgentWidth
    handleResize();

    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除监听器，防止内存泄漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 初始化 FPJS
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
      console.log("设备指纹ID:", result.visitorId);
      setStorage("visitorId", visitorId);
    };

    loadFingerprint();
  }, []);

  // 订阅Service Worker 
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => console.log("Service Worker 注册成功", reg))
      .catch((err) => console.error("Service Worker 注册失败", err));
  }

  return (
    <>
      <div className={styles.app}>
        {
          isStartPages ? (
            <>
              <div className={styles.start}>
                <div className={styles.translate}>
                  <Dropdown menu={{ items }}>
                    <img draggable="false" onClick={(e) => { e.preventDefault() }} src={translate} alt="" />
                  </Dropdown>
                </div>
                <div className={styles.operate}>
                  <img draggable="false" className={styles.logo} src={Logo} alt="" />
                  <p className={styles.title}>
                    {t('startPages.title')}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsStartPages(false);
                      navigate('/home');
                    }}
                    className={styles.enterButton}
                  >
                    {t('startPages.enter')}
                  </Button>
                </div>
                <footer className={styles.footer}>
                  <p>你的设备ID是:{ visitorId }</p>
                  <p>Copyright© 2025 SouthAki,All rights reserved.</p>
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
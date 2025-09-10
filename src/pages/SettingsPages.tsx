// 导入样式
import styles from '../style/SettingPages.module.scss';

// 导入React
import { useEffect, useState } from 'react';

// 导入工具
import { judgeUserAgent } from '../utils/common';

// 导入组件
import { NavBar } from 'antd-mobile'; 
import LiquidglassSwitchButton from '../hook/LiquidglassSwitchButton';

import { setWindowsSessionStorage,getWindowsSessionStorage } from '../utils/storedFunctions';

function SettingPages() {
    // 创建React变量
    const [userAgent, setUserAgent] = useState<string>('pc');
    const [userAgentWidth, setUserAgentWidth] = useState<number>(0);

    const [proformanceMode, setPerformanceMode] = useState<boolean>(false);

    const settingsList = [
        {
            title: '性能模式',
            desc: '此功能会打开GPU加速',
            key: 'performanceMode',
            value: proformanceMode,
            onChange: handlePerformanceModeChange,
        },
        {
            title: '夜间模式',
            desc: '开启后会自动切换为夜间模式',
            key: 'darkMode',
            value: false,
            onChange: (checked: boolean) => { console.log(checked); },
        }
    ]

    // 创建生命周期
    useEffect(() => {
        // 判断用户系统
        setUserAgent(judgeUserAgent());

        // 定义窗口大小更新函数
        const handleResize = () => {
            setUserAgentWidth(window.innerWidth);
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
        settingsList.forEach((item) => {
            getWindowsSessionStorage(item.key) === 'true' ? item.onChange(true) : item.onChange(false);
        })
    })

    function goLastPages() {
        window.history.back();
    }

    function handlePerformanceModeChange(checked: boolean) {
        setPerformanceMode(checked);
        setWindowsSessionStorage('performanceMode', checked ? 'true' : 'false');
    }
    
    return (
        <>
            <div className={styles.settings}>
                {
                    userAgentWidth > 768 && userAgent === 'pc' ?
                        (
                            <>
                            </>
                        ):
                        (
                            <>
                                <section className={styles.mobile_container}>
                                    <NavBar onBack={goLastPages}>设置页</NavBar>
                                    <ul className={styles.mobile_settingsList}>
                                        {/* <li className={styles.mobile_settingsListItem}>
                                            <div className={styles.left}>
                                                <div className={styles.title}>性能模式</div>
                                                <div className={styles.desc}>此功能会打开GPU加速</div>
                                            </div>
                                            <div className={styles.right}>
                                                <LiquidglassSwitchButton checked={proformanceMode} onChange={handlePerformanceModeChange} />
                                            </div>
                                        </li> */}
                                        {
                                            settingsList.map((item) => (
                                                <li key={item.key} className={styles.mobile_settingsListItem}>
                                                    <div className={styles.left}>
                                                        <div className={styles.title}>{item.title}</div>
                                                        <div className={styles.desc}>{item.desc}</div>
                                                    </div>
                                                    <div className={styles.right}>
                                                        <LiquidglassSwitchButton checked={item.value} onChange={item.onChange} />
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </section>
                            </>
                        )
                }
            </div>
        </>
    );
}

export default SettingPages;
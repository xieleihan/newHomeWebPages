// (规划是自己开发组件来支持网易云音乐,这个暂缓开发)
// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";
import { useEffect, useState } from "react";

// 导入样式
import styles from '../../../../style/home/MusicFlow.module.scss';

import starImage from '../../../../assets/images/starry-moon-night.webp';
import { Spin } from "antd";

// // 导入aplayer
// import { APlayer } from "aplayer-react"
// // 导入aplayer的样式文件
// import "aplayer-react/dist/index.css"

import NetEaseMusicPlayer from "../../../../hook/NetEaseMusicPlayer";

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

function MusicFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');
    const [musicArray, setMusicArray] = useState<Array<any>>([]); // 音乐列表数组

    useEffect(() => {
        const handleResize = () => {
            setWidth(userAgentWidth);
            setAgentName(userAgent);
        };

        window.addEventListener('resize', handleResize);

        // 初始化
        setWidth(userAgentWidth);
        setAgentName(userAgent);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [userAgentWidth, userAgent])

    useEffect(() => {
        setMusicArray([1473228889, 2074099994])
    },[])

    return (
        <>
            <ComponentsLayout
                title="听会我喜欢的音乐~ 🎵"
                titleColor="white"
                titleSize={.3}
                isOpenPagination={false}
                backgroundImage={starImage}
                container={
                    <>
                        <section className={styles.musicFlow}>
                            <Spin size="large" spinning={musicArray.length === 0}>
                            </Spin>
                            {
                                musicArray.length !== 0 &&
                                <div className={styles.musicFlowContainer}>
                                    {/* <APlayer
                                        audio={musicArray}
                                        volume={0.7}
                                    /> */}
                                    <NetEaseMusicPlayer width={width} agentName={agentName} musicArray={musicArray}></NetEaseMusicPlayer>
                                </div>
                            }
                        </section>
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default MusicFlow;
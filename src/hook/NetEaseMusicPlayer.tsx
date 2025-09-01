interface NetEaseMusicPlayerProps { 
    musicArray: Array<any>;
    width: number;
    agentName: string;
}

import styles from './styles/NetEaseMusicPlayer.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getNetEaseMusicDetail,getNetEaseMusicLyric } from '../api/request';
import { List } from "antd";

import PlayIcon from '../assets/icon/play.svg';
import PauseIcon from '../assets/icon/pause.svg';

function NetEaseMusicPlayer({ width, agentName, musicArray }: NetEaseMusicPlayerProps) { 
    const [musicDetailArray, setMusicDetailArray] = useState<Array<any>>([]);
    const [activatedIndex, setActivatedIndex] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false); // 播放状态
    // audioLayout容器
    const audioLayoutRef = useRef<HTMLDivElement | null>(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const [audioPlayerTime, setAudioPlayerTime] = useState<string|number>(0); // 当前播放时间

    useEffect(() => {
        Promise.all(
            musicArray.map(id =>
                getNetEaseMusicDetail({ ids: id })
                    .then((res) => {
                        const str = JSON.stringify(res);
                        const obj = JSON.parse(str);
                        return obj.songs[0];
                    }).catch((error) => {
                        console.error('没有获取到网易云音乐数据:', error);
                    })
            )
        ).then((details) => {
            console.log("获取到的网易云音乐详情:", details);
            setMusicDetailArray(details);

            getNetEaseMusicLyric({ id: musicArray[0] }).then((lyricRes) => {
                console.log("获取到的网易云音乐歌词:", lyricRes);
            }).catch((error) => {
                console.error('获取网易云音乐歌词失败:', error);
            });
        }).catch((error) => {
            console.error('获取网易云音乐详情失败:', error);
        });

        return () => {
            setMusicDetailArray([]);
        }
    }, [])

    /**
     * 点击了海报图片位置
     * @returns 点击播放暂停按钮
     */
    const clickAudioLayout = () => { 
        if (!audioLayoutRef.current) return;

        if (!isPlaying) { 
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }

    /**
     * 格式化时间
     * @param ms 毫秒
     * @returns 格式化后的时间字符串 "mm:ss"
     */
    function formatTime(ms: number|string): string {
        const totalSeconds = Math.floor(Number(ms) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return (
        <>
            <section className={width > 768 && agentName == 'pc' ? styles.pcMusic : styles.mobileMusic}>
                <div className={styles.topLeft}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <div ref={audioLayoutRef} onClick={clickAudioLayout} className={styles.audioLayout}>
                                <div className={styles.audioContainer}>
                                    <div className={!isPlaying ? styles.playBox : styles.pauseBox}>
                                        <img src={!isPlaying ? PlayIcon : PauseIcon} alt="播放" loading='lazy' />
                                    </div>
                                </div>
                            </div>
                            <img className={styles.imgBox} loading='lazy' src={musicDetailArray.length > 0 ? musicDetailArray[activatedIndex]?.al?.picUrl : ''} alt="音乐封面" />
                        </div>
                        <div className={styles.right}>
                            <div className={musicDetailArray.length > 0 && musicDetailArray[activatedIndex]?.name.length > 10 ? styles.scrollTitle :styles.title}>
                                {musicDetailArray.length > 0 ? musicDetailArray[activatedIndex]?.name : '音乐标题-查找不到你喜欢的音乐'} - {musicDetailArray.length > 0 ? musicDetailArray[activatedIndex]?.ar.map((artist: any, index: number) => (
                                    <span key={index}>
                                        {artist.name}{index < musicDetailArray[activatedIndex]?.ar.length - 1 ? ' / ' : ''}
                                    </span>
                                )) : '未知艺术家'}
                            </div>
                            <div className={styles.songScroll}></div>
                            <div className={styles.config}>
                                <div className={styles.loading}>
                                    <div className={styles.bar}></div>
                                </div>
                                <div className={styles.box}>
                                    <span className={styles.songTime}>
                                        <span>{formatTime(audioPlayerTime) }</span>/<span>{musicDetailArray.length > 0 && musicDetailArray[activatedIndex]?.dt ? formatTime(musicDetailArray[activatedIndex]?.dt) : '00:00'}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomRight}>
                    <List
                        dataSource={musicDetailArray}
                        renderItem={(item, index) => { 
                            return (
                                <>
                                    <List.Item key={index} className={index === activatedIndex ? styles.listItem : styles.standenrListItem} onClick={() => setActivatedIndex(index)}>
                                        <div className={index === activatedIndex ? styles.activateIndex : styles.noActivate}></div>
                                        <div className={styles.listItemContainer}>
                                            <div className={styles.left}>
                                                <span>{index + 1}</span>
                                                <span className={index === activatedIndex ? styles.musicTitle : styles.musicStandenrTitle}>{item.name }</span>
                                            </div>
                                            <div className={styles.right}>
                                                {item.ar.map((artist: any, artistIndex: number) => (
                                                    <span key={artistIndex} className={index === activatedIndex ? styles.artistName : styles.standenrArtistName}>
                                                        {artist.name}{artistIndex < item.ar.length - 1 ? ' / ' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </List.Item>
                                </>
                            );
                        }}
                    >
                    </List>
                </div>
            </section>
        </>
    );
}

export default NetEaseMusicPlayer;
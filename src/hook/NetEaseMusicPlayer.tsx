interface NetEaseMusicPlayerProps { 
    musicArray: Array<any>;
    width: number;
    agentName: string;
}

import styles from './styles/NetEaseMusicPlayer.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getNetEaseMusicDetail, getNetEaseMusicLyric } from '../api/request';
import { List } from "antd";

import PlayIcon from '../assets/icon/play.svg';
import PauseIcon from '../assets/icon/pause.svg';
import NextMusic from '../assets/icon/nextMusic.svg';

function NetEaseMusicPlayer({ width, agentName, musicArray }: NetEaseMusicPlayerProps) { 
    const [musicDetailArray, setMusicDetailArray] = useState<Array<any>>([]);
    const [activatedIndex, setActivatedIndex] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false); // 播放状态
    // audioLayout容器
    const audioLayoutRef = useRef<HTMLDivElement | null>(null);
    const audioElement = useRef<HTMLAudioElement | null>(null);
    const [audioPlayerTime, setAudioPlayerTime] = useState<string | number>(0); // 当前播放时间
    const [audioSrc, setAudioSrc] = useState<string>('');// 歌曲urlsrc地址
    const barElement = useRef<HTMLDivElement | null>(null); // 进度条
    const [lyrics, setLyrics] = useState<Array<{ time: number; text: string }>>([]); // 歌词数组
    const [activeLyricIndex, setActiveLyricIndex] = useState<number>(0); // 当前高亮的歌词索引
    const lyricContainerRef = useRef<HTMLDivElement | null>(null); // 歌词容器

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

            setAudioSrc(`https://music.163.com/song/media/outer/url?id=${musicArray[0]}.mp3`)

            // getNetEaseMusicUrl({ id: musicArray[0] }).then((urlRes) => {
            //     console.log("获取到的网易云音乐播放地址:", urlRes);
            // }).catch((error) => {
            //     console.error('获取网易云音乐播放地址失败:', error);
            // });
        }).catch((error) => {
            console.error('获取网易云音乐详情失败:', error);
        });

        return () => {
            setMusicDetailArray([]);
        }
    }, [])

    useEffect(() => {
        getNetEaseMusicLyric({ id: musicArray[0] }).then((lyricRes) => {
            const str = JSON.stringify(lyricRes);
            const obj = JSON.parse(str);
            if (obj?.lrc?.lyric) {
                const parsedLyrics = obj.lrc.lyric
                    .split("\n")
                    .map((line: string) => {
                        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
                        if (!match) return null;
                        const min = parseInt(match[1], 10);
                        const sec = parseInt(match[2], 10);
                        const ms = parseInt(match[3].padEnd(3, "0"), 10);
                        return {
                            time: min * 60 * 1000 + sec * 1000 + ms,
                            text: match[4].trim(),
                        };
                    })
                    .filter(Boolean) as Array<{ time: number; text: string }>;
                setLyrics(parsedLyrics);
            }
        });
    }, [musicArray]);

    useEffect(() => {
        if (lyrics.length === 0) return;
        const index = lyrics.findIndex((l, i) => {
            const next = lyrics[i + 1];
            return Number(audioPlayerTime) >= l.time && (!next || Number(audioPlayerTime) < next.time);
        });
        if (index !== -1 && index !== activeLyricIndex) {
            setActiveLyricIndex(index);

            // 自动滚动到当前歌词
            const container = lyricContainerRef.current;
            const currentLine = container?.querySelector(`[data-index="${index}"]`);
            if (container && currentLine) {
                currentLine.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [audioPlayerTime, lyrics]);

    useEffect(() => {
        if (musicDetailArray.length === 0) return;
        // 切换歌曲时更新音频源
        const currentSong = musicDetailArray[activatedIndex];
        setAudioSrc(`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`);

        // 重置歌词
        setLyrics([]);
        setActiveLyricIndex(0);
        setAudioPlayerTime(0);
        if (barElement.current) barElement.current.style.width = '0%';

        // 请求当前歌曲歌词
        getNetEaseMusicLyric({ id: currentSong.id }).then((lyricRes) => {
            const str = JSON.stringify(lyricRes);
            const obj = JSON.parse(str);
            if (obj?.lrc?.lyric) {
                const parsedLyrics = obj.lrc.lyric
                    .split("\n")
                    .map((line: string) => {
                        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
                        if (!match) return null;
                        const min = parseInt(match[1], 10);
                        const sec = parseInt(match[2], 10);
                        const ms = parseInt(match[3].padEnd(3, "0"), 10);
                        return {
                            time: min * 60 * 1000 + sec * 1000 + ms,
                            text: match[4].trim(),
                        };
                    })
                    .filter(Boolean) as Array<{ time: number; text: string }>;
                setLyrics(parsedLyrics);
            }
        });
    }, [activatedIndex, musicDetailArray]);

    /**
     * 点击了海报图片位置
     * @returns 点击播放暂停按钮
     */
    const clickAudioLayout = () => { 
        if (!audioLayoutRef.current) return;

        if (!isPlaying) { 
            setIsPlaying(true);
            // 开始控制audio标签播放
            audioElement.current?.play();
            // 控制bar和时间
            const audio = audioElement.current;
            if (!audio) return;
            
            const updateProgress = () => {
                const currentTime = audio.currentTime;
                const duration = audio.duration;
                setAudioPlayerTime(currentTime * 1000); // 转换为毫秒

                if (barElement.current) {
                    const progressPercent = (currentTime / duration) * 100;
                    barElement.current.style.width = `${progressPercent}%`;
                }

                if (currentTime >= duration) {
                    setIsPlaying(false);
                    audio.currentTime = 0;
                    if (barElement.current) {
                        barElement.current.style.width = '0%';
                    }
                    setAudioPlayerTime(0);
                }
            };

            audio.addEventListener('timeupdate', updateProgress);

            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
            };
        } else {
            setIsPlaying(false);
            audioElement.current?.pause();
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

    /**
     * 自动播放
     */
    function autoPlay() {
        try {
            setTimeout(() => {
                audioElement.current?.play();
                setIsPlaying(true);
                const audio = audioElement.current;
                if (!audio) return;

                const updateProgress = () => {
                    const currentTime = audio.currentTime;
                    const duration = audio.duration;
                    setAudioPlayerTime(currentTime * 1000); // 转换为毫秒

                    if (barElement.current) {
                        const progressPercent = (currentTime / duration) * 100;
                        barElement.current.style.width = `${progressPercent}%`;
                    }

                    if (currentTime >= duration) {
                        setIsPlaying(false);
                        audio.currentTime = 0;
                        if (barElement.current) {
                            barElement.current.style.width = '0%';
                        }
                        setAudioPlayerTime(0);
                    }
                };

                audio.addEventListener('timeupdate', updateProgress);

                return () => {
                    audio.removeEventListener('timeupdate', updateProgress);
                };
            }, 200);
        } catch (error) {
            console.error("自动播放失败:", error);
        }
    }

    return (
        <>
            <section className={width > 768 && agentName == 'pc' ? styles.pcMusic : styles.mobileMusic}>
                <div className={styles.topLeft}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <div ref={audioLayoutRef} onClick={clickAudioLayout} className={styles.audioLayout}>
                                <div className={styles.audioContainer}>
                                    {
                                        width > 768 && agentName == 'pc' && (
                                            <>
                                                <div className={styles.iconBox}>
                                                    <img className={styles.lastMusic} src={NextMusic} alt="下一首" loading='lazy' />
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className={!isPlaying ? styles.playBox : styles.pauseBox}>
                                        <img src={!isPlaying ? PlayIcon : PauseIcon} alt="播放" loading='lazy' />
                                    </div>
                                    {
                                        width > 768 && agentName == 'pc' && (
                                            <>
                                                <div className={styles.iconBox}>
                                                    <img className={styles.nextMusic} src={NextMusic} alt="下一首" loading='lazy' />
                                                </div>
                                            </>
                                        )
                                    }
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
                            <div className={styles.songScroll} ref={lyricContainerRef}>
                                {lyrics.length > 0 ? (
                                    lyrics.map((line, index) => (
                                        <div
                                            key={index}
                                            data-index={index}
                                            className={`${styles.lyricLine} ${index === activeLyricIndex ? styles.activeLyric : ""
                                                }`}
                                        >
                                            {line.text || " "}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noLyric}>暂无歌词</div>
                                )}
                            </div>
                            <div className={styles.config}>
                                <div className={styles.loading}>
                                    <div ref={barElement} className={styles.bar}></div>
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
                <audio ref={audioElement} src={audioSrc} ></audio>
                <div className={styles.bottomRight}>
                    <List
                        className={styles.musicList}
                        dataSource={musicDetailArray}
                        renderItem={(item, index) => { 
                            return (
                                <>
                                    <List.Item key={index} className={index === activatedIndex ? styles.listItem : styles.standenrListItem} onClick={() =>{
                                            setActivatedIndex(index)
                                            // 启用播放
                                            autoPlay()
                                        }
                                    }>
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
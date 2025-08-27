// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";
import { useEffect, useState } from "react";

// 导入样式
import styles from '../../../../style/home/MusicFlow.module.scss';

import starImage from '../../../../assets/images/starry-moon-night.webp';
import { Spin } from "antd";

// 导入aplayer
import { APlayer } from "aplayer-react"
// 导入aplayer的样式文件
import "aplayer-react/dist/index.css"

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
        setMusicArray([
            {
                name: "Dancing with my phone",
                artist: "HYBS",
                url: "https://music.163.com/song/media/outer/url?id=1969744125",
                cover:
                    "https://p1.music.126.net/tOtUdKjS9rktAFRamcomWQ==/109951167748733958.jpg",
                lrc: "[00:00.000] 作词 : James Alyn Wee/Kasidej Hongladaromp\n[00:01.000] 作曲 : James Alyn Wee/Kasidej Hongladaromp\n[00:28.836] I'm just laying on the floor again\n[00:33.124] Can't be bothered to get up now\n[00:36.345] I wouldn’t care\n[00:38.348] If I never get up again\n[00:41.363] I don’t want to\n[00:47.388] Then our song comes on the radio\n[00:51.906] Makes me wanna start to dance, oh\n[00:55.163] I wanna know\n[00:56.997] If you feel the same way as me\n[01:00.097] Why would you go?\n[01:02.695]\n[01:05.780] Dancing, I'm all alone\n[01:09.163] Figuring out how I can get you home\n[01:15.129] Dancing with my phone\n[01:18.393] Thinking about you\n[01:22.292]\n[01:25.154] On my feet and now I'm out the door\n[01:29.741] Walking by the places that we used to go\n[01:34.478] I remember all your favorite stores\n[01:37.743] I won't lie\n[01:43.345] I don't think I even know myself anymore\n[01:52.741] You're the one who knew me ****ing well\n[01:58.914] Yeah, you know\n[02:00.129]\n[02:02.177] Dancing, I'm all alone\n[02:05.652] Figuring out how I can get you home\n[02:11.617] Dancing with my phone\n[02:14.687] Thinking about you\n[02:20.993] Dancing, I'm all alone (I'm dancing all alone)\n[02:24.218] Figuring out how I can get you home (How I can get you home)\n[02:30.291] Dancing with my phone (I'm dancing with my phone)\n[02:33.626] Thinking about you\n[02:37.376]\n[02:39.724] Dancing all alone, dancing all alone (I'm dancing all alone)\n[02:44.589] Dancing all alone, dancing all alone (I'm dancing with my phone)\n[02:49.284] Dancing with my phone\n[02:52.504] Thinking about you\n[02:58.522] Dancing all alone, dancing all alone\n[03:03.262] Dancing all alone, dancing all alone (Thinking about you)\n[03:08.094] Dancing with my phone\n[03:11.402] Thinking about you\n",
            },
            {
                name: "僕は今日も",
                artist: "Vaundy",
                url: "https://music.163.com/song/media/outer/url?id=1441997419",
                cover:
                    "https://p1.music.126.net/AnR2ejcBgGnOJXPsytivBQ==/109951164922366027.jpg",
                lrc: "[00:00.000] 作词 : Vaundy\n[00:00.002] 作曲 : Vaundy\n[00:00.04]僕は今日も - Vaundy\n[00:15.00]母さんが言ってたんだ\n[00:22.31]お前は才能があるから\n[00:29.06]「芸術家にでもなりな」と\n[00:35.98]また根拠の無い夢を語る\n[00:49.77]父さんが言ってたんだ\n[00:56.58]お前は親不孝だから\n[01:03.45]１人で生きていきなさい\n[01:08.69]また意味もわからず罵倒する\n[01:16.24]１人ではないと暗示をして\n[01:19.89]２人ではないとそう聞こえて\n[01:23.13]思ってるだけじゃ\n[01:24.88]そう 辛くてでも\n[01:26.72]そうする他にすべはなくて\n[01:29.85]愉快な日々だと暗示をして\n[01:33.38]不協和音が 聞こえてきた\n[01:36.80]抑えてるだけじゃ そう 辛くて\n[01:40.08]だから この気持ちを弾き語るよ\n[01:43.83]もしも僕らが生まれてきて\n[01:50.68]もしも僕らが大人になっても\n[01:57.48]もしも僕らがいなくなっていても\n[02:04.37]そこに僕の歌があれば\n[02:09.83]それでいいさ\n[02:18.90]彼女が言ってたんだ\n[02:25.69]あなたはカッコイイから\n[02:32.60]イケメンじゃなくていいんだよ\n[02:37.87]また元も子も無い言葉を君は言う\n[02:45.55]僕はできる子と暗示をして\n[02:48.87]心が折れる音が聞こえた\n[02:52.25]思ってるだけじゃ\n[02:54.02]そう 辛くてでも\n[02:55.86]そうする他にすべはなくて\n[02:59.12]明日は晴れると暗示をして\n[03:02.50]次の日は傘を持って行った\n[03:06.00]抑えてるだけじゃ そう 辛くて\n[03:09.10]だから この気持ちを弾き語るよ\n[03:12.96]もしも僕らが生まれてきて\n[03:19.77]もしも僕らが大人になっても\n[03:26.59]もしも僕らがいなくなっていても\n[03:33.52]そこに僕の歌があれば\n[03:38.92]それでいいさ\n[03:41.08]ピアノの音が聞こえる\n[03:47.91]ガラガラの声が聞こえる\n[03:54.01]枯れてく僕らの音楽に\n[03:57.08]飴をやって もう少しと\n[04:01.57]その気持ちを弾き語るよ\n[04:07.75]もしも僕らが生まれてきて\n[04:14.66]もしも僕らが大人になっても\n[04:21.58]もしも僕らがいなくなっていても\n[04:28.40]そこに僕の歌があれば\n[04:33.72]それでいいさ\n[04:35.48]もしも僕らに才能がなくて\n[04:42.13]もしも僕らが親孝行して\n[04:49.00]もしも僕らがイケていたら\n[04:54.74]ずっとそんなことを思ってさ\n[05:01.31]弾き語るよ\n",
            }
          ])
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
                                    <APlayer
                                        audio={musicArray}
                                        volume={0.7}
                                    />
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
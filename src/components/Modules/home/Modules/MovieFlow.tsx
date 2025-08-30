// 导入样式
import styles from '../../../../style/home/MovieFlow.module.scss';
// 导入gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
// 导入react
import { useRef, useEffect,useState } from 'react';

// 导入请求
import { getMyBilibiliFollowAnime, getMyBilibiliFollowMovie } from '../../../../api/request';

// 导入图片
import movieHeaderImage from '../../../../assets/images/movieHeaderImage.webp';

// 导入组件
import WallpaperGallery from '../../../../hook/WallpaperGallery';

// 导入Antd
import { message, Segmented } from 'antd';
import { get } from 'http';

interface MovieItem {
    id: number;
    title: string;
    cover: string;
    url: string;
}

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

function MovieFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    // 获取img的容器
    const imageRef = useRef<HTMLImageElement>(null);
    // 获取标题的容器
    const titleRef = useRef<HTMLParagraphElement>(null);
    // 获取组件的容器
    const sectionMovieRef = useRef<HTMLElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');
    // 数据
    const [animeArray, setAnimeArray] = useState<Array<any>>([]);
    const [movieArray, setMovieArray] = useState<Array<any>>([]);

    const [segmented, setSegmented] = useState<string>('追番');
    const options = ['追番', '电影'];

    // 创建消息提示
    const [messageApi, contextHolder] = message.useMessage();

    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

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
        if (!imageRef.current) return;

        gsap.from(imageRef.current, {
            y: 100,               // 从下方100px开始
            opacity: 0,           // 从透明开始
            duration: 1,          // 动画持续时间
            ease: "power3.out",   // 弹性缓动
            scrollTrigger: {
                trigger: imageRef.current, // 触发元素
                start: "bottom bottom",    // 当元素底部到达视口底部
                toggleActions: "play reverse play reverse" // 滑动到触发 -> 播放动画
            },
        });

        

    }, []);

    useEffect(() => {
        if (!titleRef.current) return;
        gsap.fromTo(titleRef.current,
            { scrambleText: { text: "", chars: "upperCase", revealDelay: 0.3 } },
            {
                scrambleText: {
                    text: `个人${segmented}列表`,
                    chars: "upperCase",
                    speed: 0.5
                },
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%", // 标题进入视口时触发
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [segmented])

    useEffect(() => {
        // 找不到组件的话
        if (!sectionMovieRef.current) return;

        // 检查是否有缓存
        const cachedData = window.sessionStorage.getItem('bilibiliFollowAnime');
        if (cachedData) {
            console.log('有缓存', JSON.parse(cachedData));
            let cachaarr: { id: any; title: any; cover: any; url: any; }[] = []
            JSON.parse(cachedData).forEach((item: any) => {
                cachaarr.push({
                    id: item.id,
                    title: item.title,
                    cover: item.cover,
                    url: item.url
                });
            });
            setAnimeArray(cachaarr as Array<MovieItem>);
            return; // 如果有缓存，直接返回
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 发起请求
                    getMyBilibiliFollowAnime({})
                        .then((res) => {
                            console.log('b站追番列表', res.data);
                            let arr: { id: any; title: any; cover: any; url: any; }[] = []
                            res.data.forEach((item: any) => {
                                arr.push({
                                    id: item.id,
                                    title: item.title,
                                    cover: item.cover,
                                    url: item.url
                                });
                            });
                            setAnimeArray(arr as Array<MovieItem>);
                            sessionStorage.setItem('bilibiliFollowAnime', JSON.stringify(arr));
                        }).catch(() => {
                            console.log('请求失败');
                            error('获取追番请求失败');
                        })
                    // 停止监听
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1, root: null, rootMargin: '0px 0px 100px 0px' });
        
        observer.observe(sectionMovieRef.current);
        
        return () => observer.disconnect();
    }, [])

    return (
        <>
            <section ref={sectionMovieRef} className={styles.movie}>
                {contextHolder}
                <div className={styles.headerBox}>
                    <img ref={imageRef} className={styles.headerImage} src={movieHeaderImage} loading='lazy' alt="b站追番" />
                    <p ref={titleRef} className={styles.title}></p>
                </div>

                <div className={styles.container}>
                    {
                        segmented === '追番' ? (
                            <WallpaperGallery width={width} agentName={agentName} data={animeArray} />
                        ) : (
                            <WallpaperGallery width={width} agentName={agentName} data={movieArray} />
                        )
                    }
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerSegmented}>
                        呀,咋只有{segmented}的呢?快切换下看我喜欢的{segmented=='追番'?'电影':'追番'}吧<br /> 
                        <div className={styles.footerSegmentedDiv}>
                            <span>--&gt;</span>
                            <Segmented
                                options={options}
                                size="small"
                                onChange={(value) => {
                                    setSegmented(value.toString());
                                    if (value.toString() === '电影') {
                                        const cachedData = window.sessionStorage.getItem('bilibiliFollowMovie');
                                        if (cachedData) {
                                            console.log('有缓存', JSON.parse(cachedData));
                                            let cachaarr: { id: any; title: any; cover: any; url: any; }[] = []
                                            JSON.parse(cachedData).forEach((item: any) => {
                                                cachaarr.push({
                                                    id: item.id,
                                                    title: item.title,
                                                    cover: item.cover,
                                                    url: item.url
                                                });
                                            });
                                            setMovieArray(cachaarr as Array<MovieItem>);
                                            return; // 如果有缓存，直接返回
                                        }
                                        getMyBilibiliFollowMovie({})
                                            .then((res) => {
                                                console.log('b站电影列表', res.data);
                                                let arr: { id: any; title: any; cover: any; url: any; }[] = []
                                                res.data.forEach((item: any) => {
                                                    arr.push({
                                                        id: item.id,
                                                        title: item.title,
                                                        cover: item.cover,
                                                        url: item.url
                                                    });
                                                });
                                                setMovieArray(arr as Array<MovieItem>);
                                                sessionStorage.setItem('bilibiliFollowMovie', JSON.stringify(arr));
                                            }).catch(() => {
                                                console.log('请求失败');
                                                error('获取电影请求失败');
                                            });
                                    }
                                }}
                            />
                            <span>&lt;--</span>
                        </div>
                    </div>
                    <p className={styles.footerText}>*以上信息实时获取Bilibili的{segmented }列表</p>
                </div>
            </section>
        </>
    );
}

export default MovieFlow;
// 导入样式
import styles from '../../../../style/home/MovieFlow.module.scss';
// 导入gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);
// 导入react
import { useRef, useEffect,useState } from 'react';

// 导入请求
import { getMyBilibiliFollowAnime } from '../../../../api/request';

// 导入图片
import movieHeaderImage from '../../../../assets/images/movieHeaderImage.webp';

// 导入Antd
import { message } from 'antd';

function MovieFlow() {
    // 获取img的容器
    const imageRef = useRef<HTMLImageElement>(null);
    // 获取组件的容器
    const sectionMovieRef = useRef<HTMLElement>(null);
    // 数据
    const [animeArray, setAnimeArray] = useState<Array<any>>([]);

    // 创建消息提示
    const [messageApi, contextHolder] = message.useMessage();

    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content,
        });
    };

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
        // 找不到组件的话
        if (!sectionMovieRef.current) return;

        // 检查是否有缓存
        const cachedData = window.sessionStorage.getItem('bilibiliFollowAnime');
        if (cachedData) {
            console.log('有缓存', JSON.parse(cachedData));
            setAnimeArray(JSON.parse(cachedData));
            return; // 如果有缓存，直接返回
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 发起请求
                    getMyBilibiliFollowAnime({})
                        .then((res) => {
                            console.log('b站追番列表', res.data);
                            setAnimeArray(res.data);
                            sessionStorage.setItem('bilibiliFollowAnime', JSON.stringify(res.data));
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
                <img ref={imageRef} className={styles.headerImage} src={movieHeaderImage} loading='lazy' alt="b站追番" />

                <div className={styles.container}>
                    <canvas className={styles.canvas}></canvas>
                </div>
            </section>
        </>
    );
}

export default MovieFlow;
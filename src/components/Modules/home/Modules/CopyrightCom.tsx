// 导入样式
import styles from '../../../../style/home/CopyrightCom.module.scss';

// 导入环境变量
const copyright_string = import.meta.env.VITE_COPYRIGHTSTRING;
const creation_time = import.meta.env.VITE_CREATION_TIME;

// 导入React
import { useEffect,useState } from 'react';

function CopyrightCom() {
    // 创建React变量
    // 与创建的时间过去的天数
    const [days, setDays] = useState(0);
    // 与创建的时间过去的小时数
    const [hours, setHours] = useState(0);
    // 与创建的时间过去的分钟数
    const [minutes, setMinutes] = useState(0);
    // 与创建的时间过去的秒数
    const [seconds, setSeconds] = useState(0);
    // 与创建的时间旅行者一号飞行的千米数
    const [t, setT] = useState(0);
    // 与创建的时间旅行者一号飞行的天文单位数
    const [a, setA] = useState(0);

    // 生命周期创建计时器
    useEffect(() => {
        const timer = setInterval(() => {
            // 获取现在时间
            const now = new Date();
            // 经过的时间
            const runTime = Math.floor((now.getTime() - new Date(creation_time).getTime()) / 1000);

            // 计算旅行者一号飞行的千米数和天文单位数
            const newT = Math.trunc(234e8 + runTime / 1e3 * 17);
            const newA = parseFloat((newT / 1496e5).toFixed(6));

            // 计算与创建的时间过去的天数、小时数、分钟数、秒数
            setDays(Math.floor(runTime / (60 * 60 * 24)));
            setHours(Math.floor(runTime / (60 * 60) % 24));
            setMinutes(Math.floor(runTime / 60 % 60));
            setSeconds(Math.floor(runTime % 60));
            setT(newT);
            setA(newA);
        }, 1000);

        // 组件卸载时清除计时器
        return () => clearInterval(timer);
    }, [creation_time]);

    return (
        <>
            <div className={styles.copyright}>
                <div className={styles.top}>{copyright_string}</div>
                <div className={styles.bottom}>
                    <p style={{
                        whiteSpace: 'nowrap'
                    }}>开始逐光之旅的第：{days}天{hours}时{minutes}分{seconds}秒，愿在年少时期，你能路过我生命</p>
                    <p style={{
                        whiteSpace: 'nowrap'
                    }}>现在旅行者一号距离地球{t}千米，约为{a}个天文单位🚀</p>
                </div>
            </div>
        </>
    );
}

export default CopyrightCom;
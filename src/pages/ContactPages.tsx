// 导入样式
import styles from '../style/ContactPages.module.scss';

// 导入组件
import ReturnlastpagesBtnicon from '../components/ReturnlastpagesBtnicon';

// 导入图片
import hello from '../assets/icon/hello.svg';
import { useEffect, useState,useRef } from 'react';

function ContactPages() {
    const [selectEmailSuffix, setSelectEmailSuffix] = useState('');
    const selectBox = useRef<HTMLUListElement>(null); // 选择框
    const select = useRef<HTMLDivElement>(null); // 选择项

    const emailSuffix = ['@gmail.com', '@qq.com', '@163.com', '@126.com', '@foxmail.com', '@outlook.com', '@yahoo.com', '@icloud.com'];   

    useEffect(() => {
        setSelectEmailSuffix(emailSuffix[Math.floor(Math.random() * emailSuffix.length)]);
    }, []);

    useEffect(() => {
        // 监听select容器的宽度,宽度变化则改变selectBox的宽度
        const resizeObserver = new ResizeObserver(() => {
            if (select.current && selectBox.current) {
                selectBox.current.style.width = `${select.current.offsetWidth}px`;
            }
        });
        if (select.current) {
            resizeObserver.observe(select.current);
        }

        return () => {
            resizeObserver.disconnect();
        }
    },[select])

    return (
        <>
            <ReturnlastpagesBtnicon />
            <div className={styles.contact}>
                <div className={styles.container}>
                    <p className={styles.title}>联系到我</p>
                    <div className={styles.label}>
                        <span>回复邮箱:</span>
                        <div className={styles.box}>
                            <div className={styles.email}  contentEditable="true"></div>
                            <div ref={select} className={styles.select} onClick={() => {
                                selectBox.current!.style.opacity = '1';
                                selectBox.current!.style.visibility = 'visible';
                            }}>{selectEmailSuffix}</div>
                        </div>
                        <ul ref={selectBox} className={styles.selectBox}>
                            {emailSuffix.map((item) => (
                                <li key={item} onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectEmailSuffix(item);
                                    selectBox.current!.style.opacity = '0';
                                    selectBox.current!.style.visibility = 'hidden';
                                }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.textarea}>
                        <span>内容:</span>
                        <textarea></textarea>
                    </div>
                    <img loading='lazy' className={styles.hello} src={hello} alt="打招呼" />
                </div>
            </div>
        </>
    );
}

export default ContactPages;
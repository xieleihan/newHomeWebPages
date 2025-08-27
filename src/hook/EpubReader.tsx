import { useState, useRef } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import styles from './styles/EpubReader.module.scss';

interface EpubReaderProps {
    src: string; // 电子书文件路径
    title?: string; // 电子书标题
}

function EpubReader({ src, title }: EpubReaderProps) {
    const [location, setLocation] = useState<string | number>(0);
    const [percentage, setPercentage] = useState(0);
    const renditionRef = useRef<any>(null);

    function locationChanged(loc: string | number) {
        setLocation(loc);
        // 计算进度 - 修复 API 调用
        if (renditionRef.current && renditionRef.current.locations) {
            try {
                // 正确的 API 调用方式
                const currentPercentage = renditionRef.current.locations.percentageFromCfi(loc);
                setPercentage(Math.floor(currentPercentage * 100));
            } catch (error) {
                console.log('进度计算错误:', error);
            }
        }
    } 

    return (
        <div className={styles.epubContainer}> {/* 修复类名拼写错误 */}
            {title && (
                <header className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.progress}>阅读进度: {percentage}%</div>
                </header>
            )}
            <ReactReader
                url={src}
                location={location}
                locationChanged={locationChanged}
                tocChanged={(toc) => console.log('目录:', toc)}
                epubOptions={{
                    allowScriptedContent: true,
                    allowPopups: true
                }}
                getRendition={(rendition) => {
                    renditionRef.current = rendition;
                    // 确保 locations 被加载
                    rendition.on('rendered', () => {
                        console.log('页面渲染完成');
                    });
                }}
            />
        </div>
    );
}

export default EpubReader;
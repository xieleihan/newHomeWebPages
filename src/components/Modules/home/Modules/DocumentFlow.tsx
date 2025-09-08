// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";
import { useEffect, useState } from "react";
import LiquidglassCard from "../../../../hook/LiquidglassCard";

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

// 文档的展示
function DocumnetFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');

    const dataArray = [
        {
            index: 0,
            title: '项目文档',
            content: '包含前端、后端、数据库等项目的设计文档、技术文档和使用文档。',
            imageUrl: 'https://picsum.photos/3840/2160?random=1',
            linkUrl: 'https://example.com/doc1',
            altText: 'Document 1'
        },
        {
            index: 1,
            title: '学习笔记',
            content: '涵盖各种技术栈、编程语言和工具的学习笔记和教程。',
            imageUrl: 'https://picsum.photos/3840/2160?random=2',
            linkUrl: 'https://example.com/doc2',
            altText: 'Document 2'
        },
        {
            index: 2,
            title: '个人随笔',
            content: '记录个人的思考、见解和生活点滴的随笔文章。',
            imageUrl: 'https://picsum.photos/3840/2160?random=3',
            linkUrl: 'https://example.com/doc3',
            altText: 'Document 3'
        }
    ]
    
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
    },[userAgentWidth,userAgent])

    return (
        <>
            <ComponentsLayout
                title="个人文档"
                titleColor="black"
                titleSize={.3}
                isOpenPagination={false}
                container={
                    <>
                        {dataArray.map((item) => (
                            <LiquidglassCard
                                index={item.index}
                                title={item.title}
                                content={item.content}
                                imageUrl={item.imageUrl}
                                linkUrl={item.linkUrl}
                                altText={item.altText}
                            />
                        ))}
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default DocumnetFlow;
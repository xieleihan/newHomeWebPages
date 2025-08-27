// 导入布局组件
import ComponentsLayout from "../../../../layout/ComponentsLayout";
import { useEffect,useState } from "react";

interface HomecontentComProps {
    userAgentWidth: number;
    userAgent: string;
}

// 文档的展示
function DocumnetFlow({ userAgentWidth, userAgent }: HomecontentComProps) {
    const [width, setWidth] = useState<number>(0);
    const [agentName, setAgentName] = useState<string>('');
    
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
                    </>
                }
            ></ComponentsLayout>
        </>
    );
}

export default DocumnetFlow;
interface LiquidglassArrowProps { 
    direction?: 'up' | 'down' | 'left' | 'right';
    size?: number;
    clickfn?: () => void;
}

function LiquidglassArrow({ direction = 'down',size,clickfn }: LiquidglassArrowProps) { 
    const rotate = {
        right: 0,
        down: 90,
        left: 180,
        up: 270
    }[direction]
    return (
        <>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                    transform: `rotate(${rotate}deg)`,
                    transformOrigin: "center",
                    mixBlendMode: "screen",
                }}
                onClick={clickfn}
            >
                {/* 半透明箭头主体 */}
                <path
                    d="M8 5L16 12L8 19"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* 高光叠加 */}
                <path
                    d="M8 5L16 12L8 19"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "blur(1px)" }}
                />
                {/* 内阴影 */}
                <path
                    d="M8 5L16 12L8 19"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "blur(0.5px)" }}
                />
            </svg>

            {/* 可选：折射动画滤镜 */}
            <svg style={{ display: "none" }}>
                <filter>
                    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="2" result="noise" />
                    <feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
                    <feDisplacementMap in="SourceGraphic" in2="blurred" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
        </>
    );
}

export default LiquidglassArrow;
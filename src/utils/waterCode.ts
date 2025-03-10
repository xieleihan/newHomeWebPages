let intervalId: ReturnType<typeof setInterval> | null = null;
/**
 * 瀑布流Code动画
 * @param canvas 
 * @returns 
 */
function waterCode(canvas: HTMLCanvasElement) {
    // 获取画布上下文
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 画布尺寸
    const fontSize = 20 * window.devicePixelRatio;
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    canvas.width = width;
    canvas.height = height;

    const columnWidth = fontSize;
    const columnCount = Math.floor(width / columnWidth);
    const nextChar = new Array(columnCount).fill(0);

    // 颜色数组
    const colors = [
        '#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#99cc00',
        '#669900', '#ffbb33', '#ff8800', '#ff4444', '#cc0000'
    ];

    // 获取随机颜色
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    // 获取随机字符
    const getRandomChar = () => {
        const str = 'the quick brown fox jumps over the lazy dog';
        return str[Math.floor(Math.random() * str.length)];
    };

    // 清除已有的计时器
    if (intervalId) {
        clearInterval(intervalId);
    }

    // 绘制动画
    function draw() {
        if (!ctx) return;

        ctx.fillStyle = 'rgba(240,240,240,0.1)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < columnCount; i++) {
            ctx.fillStyle = getRandomColor();
            ctx.font = `${fontSize}px "Roboto Mono"`;
            const x = i * columnWidth;
            const y = (nextChar[i] + 1) * fontSize;

            ctx.fillText(getRandomChar(), x, y);

            if (y > height && Math.random() > 0.99) {
                nextChar[i] = 0;
            }
            nextChar[i]++;
        }
    }

    intervalId = setInterval(draw, 30); // 启动动画
}

export default waterCode;
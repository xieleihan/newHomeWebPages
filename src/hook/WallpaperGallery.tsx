import { useRef, useEffect } from 'react';

interface ImageArray {
    src: string;
    alt: string;
    title: string;
    link: string;
}

interface ImgData {
    img: HTMLImageElement;
    x: number;
    y: number;
    scale: number;
}

function WallpaperGallery({ data }: { data: Array<ImageArray> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgDataRef = useRef<ImgData[]>([]);
    const hoverImgRef = useRef<ImgData | null>(null);

    const config = useRef({
        img_total: data.length,
        row_max: 3,
        line_max: 3,
        img_width: Math.min(window.innerWidth / 5, 200),
        img_height: Math.min(window.innerHeight / 5, 200),
        img_margin: 10,
        total_width: 0,
        total_height: 0,
        if_movable: false,
    });

    /**
     * 绘制圆角矩形
     * @param ctx 
     * @param x 
     * @param y 
     * @param width 
     * @param height 
     * @param radius 
     */
    const drawRoundedRect = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
    ) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };

    /**
     * 移动图片
     * @param dx 
     * @param dy 
     * @returns 
     */
    const moveImgs = (dx: number, dy: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { img_width, img_height, total_width, total_height, img_margin } = config.current;

        imgDataRef.current.forEach(img => {
            img.x += dx;
            img.y += dy;

            if (img.x > (total_width - img_width)) img.x -= total_width + img_margin;
            if (img.x < -img_width) img.x += total_width + img_margin;
            if (img.y > (total_height - img_height)) img.y -= total_height + img_margin;
            if (img.y < -img_height) img.y += total_height + img_margin;

            ctx.save();
            drawRoundedRect(ctx, img.x, img.y, img_width, img_height, 20);
            ctx.clip();

            const scale = img.scale;
            const scaleDx = (img_width * (scale - 1)) / 2;
            const scaleDy = (img_height * (scale - 1)) / 2;

            ctx.drawImage(img.img, img.x - scaleDx, img.y - scaleDy, img_width * scale, img_height * scale);
            ctx.restore();
        });
    };

    /**
     * 动画缩放
     * @param img 
     * @param targetScale 
     */
    const animateScale = (img: ImgData, targetScale: number) => {
        const duration = 300;
        const frameRate = 1000 / 60;
        const totalFrames = duration / frameRate;
        const startScale = img.scale;
        const scaleChange = targetScale - startScale;
        let currentFrame = 0;

        const animate = () => {
            currentFrame++;
            img.scale = startScale + scaleChange * (currentFrame / totalFrames);
            moveImgs(0, 0);
            if (currentFrame < totalFrames) requestAnimationFrame(animate);
            else img.scale = targetScale;
        };

        animate();
    };

    /**
     * 处理悬停
     * @param x 
     * @param y 
     */
    const handleHover = (x: number, y: number) => {
        const { img_width, img_height } = config.current;
        const img = imgDataRef.current.find(img => x >= img.x && x < img.x + img_width && y >= img.y && y < img.y + img_height);

        if (img) {
            if (hoverImgRef.current && hoverImgRef.current !== img) {
                animateScale(hoverImgRef.current, 1);
            }
            hoverImgRef.current = img;
            animateScale(img, 1.2);
        } else if (hoverImgRef.current) {
            animateScale(hoverImgRef.current, 1);
            hoverImgRef.current = null;
        }
    };

    /**
     * 创建图片数据
     */
    const createImgData = () => {
        const { img_total, row_max, img_width, img_height, img_margin } = config.current;
        let imagesLoaded = 0;
        imgDataRef.current = [];
        for (let i = 0; i < img_total; i++) {
            const img = new Image();
            img.src = data[i].src;
            img.onload = () => {
                const col_index = i % row_max;
                const line_index = Math.floor(i / row_max);
                const x = col_index * (img_width + img_margin);
                const y = line_index * (img_height + img_margin);
                imgDataRef.current.push({ img, x, y, scale: 1 });
                imagesLoaded++;
                if (imagesLoaded === img_total) moveImgs(0, 0);
            };
        }
    };

    /**
     * 
     * @returns 
     */
    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (imgDataRef.current.length > 0) moveImgs(0, 0);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { row_max, line_max, img_width, img_height, img_margin } = config.current;
        config.current.total_width = row_max * (img_width + img_margin) - img_margin;
        config.current.total_height = line_max * (img_height + img_margin) - img_margin;

        resizeCanvas();
        createImgData();

        const handleResize = () => resizeCanvas();
        window.addEventListener("resize", handleResize);

        const handleMouseDown = () => { config.current.if_movable = true; };
        const handleMouseUp = (e: MouseEvent) => { config.current.if_movable = false; handleHover(e.offsetX, e.offsetY); };
        const handleMouseLeave = () => { config.current.if_movable = false; };
        const handleMouseMove = (e: MouseEvent) => {
            if (!config.current.if_movable) {
                handleHover(e.offsetX, e.offsetY);
                return;
            }
            moveImgs(e.movementX, e.movementY);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
}

export default WallpaperGallery;

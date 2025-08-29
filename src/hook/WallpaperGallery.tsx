import { useRef, useEffect } from 'react';
import { proxyRequest } from '../api/request';

// 导入环境变量
const base_url = import.meta.env.VITE_BASE_API;

interface ImageArray {
    cover: string;
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

interface WallpaperGalleryProps {
    data: Array<ImageArray>;
    width: number;
    agentName: string;
}

function WallpaperGallery({ data, width, agentName }: WallpaperGalleryProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgDataRef = useRef<ImgData[]>([]);
    const hoverImgRef = useRef<ImgData | null>(null);

    // 输出传递的数据
    console.log('data', data);

    const config = useRef({
        img_total: 0,
        row_max: width > 768 && agentName !== 'mobile' ? 15 : 4,
        line_max: width > 768 && agentName !== 'mobile' ? 15 : 4,
        img_width: width > 768 && agentName !== 'mobile' ? window.innerWidth / 8 : window.innerWidth / 4,
        img_height: width > 768 && agentName !== 'mobile' ? window.innerHeight / 3  : window.innerWidth / 2 ,
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

        console.log('moveImgs called with', dx, dy, 'canvas size:', canvas.width, canvas.height);
        console.log('imgDataRef.current.length:', imgDataRef.current.length);

        // 检查是否有图片数据
        if (imgDataRef.current.length === 0) {
            console.log('No image data available for moving');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { img_width, img_height, total_width, total_height, img_margin } = config.current;

        imgDataRef.current.forEach((img, index) => {
            // 检查图片是否已加载
            if (!img.img || !img.img.complete) {
                console.log('Image not loaded yet:', index);
                return;
            }

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
    const createImgData = async () => {
        // 检查数据是否存在
        if (!data || data.length === 0) {
            console.warn('No data provided or data is empty');
            return;
        }

        // 更新配置
        config.current.img_total = data.length;
        config.current.line_max = Math.ceil(data.length / config.current.row_max);

        const { img_total, row_max, img_width, img_height, img_margin } = config.current;
        let imagesLoaded = 0;
        imgDataRef.current = [];

        console.log('Creating img data for', img_total, 'images');

        for (let i = 0; i < img_total; i++) {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // 处理跨域问题
            
            try {
                const response = await proxyRequest({ url: data[i].cover });
                console.log('Image proxy response:', response);
                const str = JSON.stringify(response);
                const obj = JSON.parse(str);
                img.src = base_url + obj.url;
            } catch (error) {
                console.error('Failed to get proxy image:', error);
                // 如果代理失败，直接使用原图片URL
                img.src = data[i].cover;
            }

            // 创建闭包保存当前索引
            ((index) => {
                img.onload = () => {
                    console.log('Image loaded:', index, data[index].cover);
                    const col_index = index % row_max;
                    const line_index = Math.floor(index / row_max);
                    const x = col_index * (img_width + img_margin);
                    const y = line_index * (img_height + img_margin);
                    imgDataRef.current.push({ img, x, y, scale: 1 });
                    imagesLoaded++;
                    console.log('Images loaded:', imagesLoaded, 'of', img_total);
                    if (imagesLoaded === img_total) {
                        moveImgs(0, 0);
                    }
                };

                img.onerror = () => {
                    imagesLoaded++;
                    if (imagesLoaded === img_total) {
                        moveImgs(0, 0);
                    }
                };
            })(i);
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

        // 检查数据
        if (!data || data.length === 0) {
            console.warn('No data available for rendering');
            return;
        }

        const { row_max, img_width, img_height, img_margin } = config.current;
        const line_max = Math.ceil(data.length / row_max);
        config.current.line_max = line_max;
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
            console.log('Mouse move event:', { 
                if_movable: config.current.if_movable, 
                movementX: e.movementX, 
                movementY: e.movementY,
                offsetX: e.offsetX,
                offsetY: e.offsetY
            });
            
            if (!config.current.if_movable) {
                handleHover(e.offsetX, e.offsetY);
                return;
            }
            moveImgs(e.movementX, e.movementY);
        };

        // pc端
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("mousemove", handleMouseMove);


        let lastTouchX = 0;
        let lastTouchY = 0;
        // 移动端
        canvas.addEventListener("touchstart", (e) => {
            config.current.if_movable = true;
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                lastTouchX = touch.clientX;
                lastTouchY = touch.clientY;
                handleHover(touch.clientX, touch.clientY);
            }
        });
        canvas.addEventListener("touchend", () => {
            config.current.if_movable = false
        });
        canvas.addEventListener("touchmove", (e) => {
            if (!config.current.if_movable) return;
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const dx = touch.clientX - lastTouchX;
                const dy = touch.clientY - lastTouchY;
                moveImgs(dx, dy);
                lastTouchX = touch.clientX;
                lastTouchY = touch.clientY;
            }
            e.preventDefault();
        }, { passive: false });

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("mousemove", handleMouseMove);

            // 移动端
            canvas.removeEventListener("touchstart", () => { });
            canvas.removeEventListener("touchend", () => { });
            canvas.removeEventListener("touchmove", () => { });
        };
    }, [data]); // 添加 data 依赖

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <canvas style={{ width: '100%', height: '100%' }} ref={canvasRef}></canvas>
            {(!data || data.length === 0) && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#666',
                    fontSize: '18px'
                }}>
                    No images to display
                </div>
            )}
        </div>
    );
}

export default WallpaperGallery;

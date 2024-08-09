// Copyright© 2024 By SouthAki All Rights Reserved.
//  业务逻辑代码
var intervalId1 = null;
// 定义要观察的元素
const targetElement = document.querySelector('.mainBox .content .info .infoBox .infoBoxRight .infoBoxRightBox .infoBoxRightBoxBottom .box .programmingLanguage');

// 定义观察者选项
const options = {
    root: null, // 视口作为根元素
    rootMargin: '0px',
    threshold: 1 // 当目标元素的100%可见时触发
};

// 创建观察者实例
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 元素进入可见区域
            // console.log('元素可见');
            // 在这里执行你的JS代码
            // 获取canvas元素
            const cvs = document.querySelector(".programmingLanguageContent");

            const codeBox = document.querySelector(".mainBox .content .info .infoBox .infoBoxRight .infoBoxRightBox .infoBoxRightBoxBottom .box .programmingLanguage");
            
            // console.log(codeBox);
            // console.log(codeBox.offsetWidth);
            // console.log(codeBox.offsetHeight);
            // console.log(window.devicePixelRatio);

            // 获取窗口尺寸，防止失真
            const width = codeBox.clientWidth * window.devicePixelRatio;
            const height = codeBox.clientHeight * window.devicePixelRatio;
            // const width = codeBox.offsetWidth
            // const height = codeBox.offsetHeight

            // 设置canvas尺寸为窗口尺寸
            // cvs.width = codeBox.offsetWidth;
            // cvs.height = codeBox.offsetHeight * window.devicePixelRatio;
            cvs.width = codeBox.clientWidth * window.devicePixelRatio;
            cvs.height = codeBox.clientHeight * window.devicePixelRatio;

            // 获取绘制上下文
            const ctx = cvs.getContext("2d");
            // 字体大小
            const fontSize = 12 * devicePixelRatio;

            // 随机颜色生成
            function getRandomColor() {
                const fontColor = [
                    '#33b5e5',
                    '#0099cc',
                    '#aa66cc',
                    '#9933cc',
                    '#99cc00',
                    '#669900',
                    '#ffbb33',
                    '#ff8800',
                    '#ff4444',
                    '#cc0000',
                ];
                return fontColor[Math.floor(Math.random() * fontColor.length)]
            }

            // 随机文字
            function getRandomChar() {
                // 随机字符,但是采用一个有名的句子,确保26个字母都可以被随机到
                const str = 'the quick brown fox jumps over the lazy dog';
                return str[Math.floor(Math.random() * str.length)];
            }

            // 列宽
            const columnWidth = fontSize;
            // 列数
            const columnCount = Math.floor(width / columnWidth);
            // 每一列下一个文字是第几个
            const nextChar = new Array(columnCount).fill(0);

            // 画一行文字
            function draw() {
                // 画布背景
                ctx.fillStyle = 'rgba(240,240,240,0.1)';
                ctx.fillRect(0, 0, width, height);
                for (let i = 0; i < columnCount; i++) {
                    // 画一个字符
                    // 颜色 字符 字体 位置
                    ctx.fillStyle = getRandomColor();
                    const char = getRandomChar();
                    ctx.font = `${fontSize}px "JetBrainsMonoBold"`;
                    const x = i * columnWidth;
                    const s = nextChar[i];
                    const y = (s + 1) * fontSize;
                    ctx.fillText(char, x, y);
                    if (y > height && Math.random() > 0.99) {
                        nextChar[i] = 0;
                    }
                    nextChar[i]++;
                }
            }

            draw();
            intervalId1 = setInterval(draw, 50);
        } else {
            // 元素离开可见区域
            // console.log('元素不可见');
            // 在这里停止执行你的JS代码
            clearInterval(intervalId1);
        }
    });
}, options);

// 开始观察元素
observer.observe(targetElement);
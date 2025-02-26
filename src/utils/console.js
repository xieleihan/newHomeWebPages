function getMultiLine(f) {
    const lines = f.toString();
    return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
}

// 字符画不能随意缩进，不然显示会错位
const console_text = function () {
    /* 
                    _ooOoo_
                   o8888888o
                   88" . "88
                   (| -_- |)
                   O\  =  /O
                ____/`---'\____
              .'  \\|     |//  `.
             /  \\|||  :  |||//  \
            /  _||||| -:- |||||-  \
            |   | \\\  -  /// |   |
            | \_|  ''\---/''  |   |
            \  .-\__  `-`  ___/-. /
          ___`. .'  /--.--\  `. . __
       ."" '<  `.___\_<|>_/___.'  >'"".
      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
      \  \ `-.   \_ __\ /__ _/   .-` /  /
 ======`-.____`-.___\_____/___.-`____.-'======
                    `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
              Buddha Bless, No Bug !           
              
%c 未知苦处,不信神佛.
                       Copyright© 2024 By SouthAki All Rights Reserved.
    */
};

console.log(getMultiLine(console_text), 'color:black;font-size:16px;font-style:italic;font-family:Monospace;');

// 业务逻辑
// 打印页面相关信息（代码更新时间）
const date = new Date();
const a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
const b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
console.log(`%c Now Time : %c ${date} `, a, b);
/* 样式代码 */
const styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
const styleTitle2 = `
font-style: oblique;
font-size:14px;
color: rgb(244,167,89);
font-weight: 400;
`
const styleContent = `
color: rgb(30,152,255);
`

/* 内容代码 */
const title1 = '🗺️🧭 岩石糖黑茶 '
const title2 = '一个全栈开发者的个人主页'

// => 读取配置型（在配置文件里配置这些会变动的网址）
const offiUrl = 'https://rocksugarblacktea.ac.cn'
const content = `
版 本 号：1.0.0    【岩石糖黑茶】
编译日期：2025-02-20 10:24:00 
版权声明：
Copyright© 2024 By SouthAki All Rights Reserved.
该项目已经选择开源,遵守GPL开源协议
项目可在Github上下载到源码,除商用外,准许任何形式的使用.
让我们拥抱开源的星辰大海  -- 岩石糖黑茶
🏠官网:  ${offiUrl}
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)
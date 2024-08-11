// Copyright© 2024 By SouthAki All Rights Reserved.
function getMultiLine(f) {
    var lines = f.toString();
    return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
}

// 字符画不能随意缩进，不然显示会错位
var console_text = function () {
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

// 浏览器搞笑标题
// start
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "../images/peacock_flat.ico");
        document.title = '╭(°A°`)╮ 你为什么走了,记得回来哦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "../images/peacock_flat.ico");
        document.title = '(ฅ>ω<*ฅ) 谢谢来访 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
// end

// 业务逻辑
// 打印页面相关信息（代码更新时间）
let date = new Date();
let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
console.log(`%c Now Time : %c ${date} `, a, b);
/* 样式代码 */
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-style: oblique;
font-size:14px;
color: rgb(244,167,89);
font-weight: 400;
`
var styleContent = `
color: rgb(30,152,255);
`

/* 内容代码 */
var title1 = '🗺️🧭 岩石糖黑茶 '
var title2 = '一个全栈开发者的个人主页'

// => 读取配置型（在配置文件里配置这些会变动的网址）
var offiUrl = 'https://rocksugarblacktea.ac.cn'
var content = `
版 本 号：1.0.0    【岩石糖黑茶】
编译日期：2024-08-05 10:24:00 
版权声明：
Copyright© 2024 By SouthAki All Rights Reserved.
该项目已经选择开源,遵守GPL开源协议
项目可在Github上下载到源码,除商用外,准许任何形式的使用.
让我们拥抱开源的星辰大海  -- 岩石糖黑茶
🏠官网:  ${offiUrl}
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

var truecount = 0;
// 时间函数
// start
function updateTime() {
    var nowDate = new Date();
    // console.log(nowDate);
    var nowHour = nowDate.getHours();
    var nowMinute = nowDate.getMinutes();
    // console.log(nowHour, nowMinute);
    var a = Math.floor(nowHour / 10)
    // console.log(a);
    var b = nowHour % 10
    // console.log(b);
    var c = Math.floor(nowMinute / 10)
    // console.log(c);
    var d = nowMinute % 10
    // console.log(d);
    var arr = [a, b, c, d];
    var timelist = document.querySelectorAll(".timelist");
    // console.log(timelist);
    for (var i = 0; i < timelist.length; i++) {
        timelist[i].innerHTML = arr[i];
    }
    // requestAnimationFrame()方法 :是浏览器提供的一个用于执行动画的api,它在浏览器每次重绘之前执行指定的代码,这个可以实现高精度的时间自动刷新,而且能保证精度,不过要考虑浏览器兼容问题
    requestAnimationFrame(updateTime);
    truecount = 1;
}
if (truecount == 0) {
    updateTime();
}
else {
    setTimeout(updateTime, 29000);
}
// end

// 业务代码
// 个人信息卡的切换 start
$(".mainBox .content .info .infoBox .infoBoxRight .infoBoxRightBox .infoBoxRightBoxTop ul li").click(function () {
    // clearInterval(intervalId1);
    $(this).addClass("active").siblings().removeClass("active");
    // console.log($(this).index());
    $(".mainBox .content .info .infoBox .infoBoxRight .infoBoxRightBox .infoBoxRightBoxTop .mask").css("left", $(this).index() * 33.33333 + "%");
    $(".mainBox .content .info .infoBox .infoBoxRight .infoBoxRightBox .infoBoxRightBoxBottom .box").css("left", $(this).index() * -100 + "%");
});
// end

// likeContent的业务逻辑
// start
var isThrottled = false;
var likeContent = $(".mainBox .main").outerHeight() + $(".mainBox .content").outerHeight() - $(".mainBox .content").outerHeight() / 2;
// console.log(likeContent);
$(window).on('scroll', function () {
    var topKm = 0;
    if (!isThrottled) {
        isThrottled = true;

        // 延迟执行的逻辑
        setTimeout(function () {
            topKm = $(window).scrollTop();
            // console.log(topKm);
            isThrottled = false; // 重置节流状态
            // console.log(likeContent - 3);
            if (topKm > likeContent - 3) {
                $(".mainBox .likeThings .likeThingsBox .likeContent").css("width", "100%");
            } else {
                $(".mainBox .likeThings .likeThingsBox .likeContent").css("width", "0%"); $(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul .pointer").css('display', 'none');
            }
        }, 200);

    }

});
// $(".mainBox .likeThings .likeThingsBox .likeContent")
// end
// 生成随机图片
// start
$(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul li").each(function () {
    var randomUrl = "https://picsum.photos/200?" + Math.random();
    $(this).css({
        "width": "15rem",
        "height": "15rem",
        "background-image": "url('" + randomUrl + "')",
        "background-size": "cover",
        "background-repeat": "no-repeat"
    });
});
// end
$(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul li").on("mouseover", function () {
    var offsetTop = $(this).position().top;
    var offsetLeft = $(this).position().left;
    $(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul .pointer").css('display', 'block');
    $(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul .pointer").css('--x', offsetLeft + "px");
    $(".mainBox .likeThings .likeThingsBox .likeContent .contentBox ul .pointer").css('--y', offsetTop + "px");
})
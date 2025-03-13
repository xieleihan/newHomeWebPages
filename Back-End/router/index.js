// 导入模块
const TechnologyStack = require('./Modules/TechnologyStack'); // 技术栈图片路由
const WebPushRouter = require('./Modules/WebPushRouter'); // WebPush路由
const ImgVerifyRouter = require('./Modules/ImgVerifyRouter'); // 图片验证码路由
const EmailVerifyRouter = require('./Modules/EmailVerifyRouter'); // 邮箱验证码路由

// 导出模块
module.exports = {
    TechnologyStack,
    WebPushRouter,
    ImgVerifyRouter,
    EmailVerifyRouter
};
// 导入模块
const TechnologyStack = require('./Modules/TechnologyStack'); // 技术栈图片路由
const WebPushRouter = require('./Modules/WebPushRouter'); // WebPush路由
const ImgVerifyRouter = require('./Modules/ImgVerifyRouter'); // 图片验证码路由
const EmailVerifyRouter = require('./Modules/EmailVerifyRouter'); // 邮箱验证码路由
const UserRouter = require('./Modules/UserRouter'); // 用户路由
const SuperUserRouter = require('./Modules/super_UserRouter'); // 超级用户路由
const superServerStatus = require('./Modules/super_serverStatusRouter'); // 服务器状态路由
const SuperUserManageRouter = require('./Modules/super_UsermanageRouter'); // 超级用户管理路由
const SuperGithubRouter = require('./Modules/super_GithubRouter'); // Github路由
const SuperFileRouter = require('./Modules/super_FileRouter'); // 文件路由
const SuperSystemConfigRouter = require('./Modules/super_SystemConfigRouter'); // 系统配置路由
const SuperAccessRouter = require('./Modules/super_AccessRouter'); // 访问路由
const SuperAuthenticationRouter = require('./Modules/super_AuthenticationRouter'); // 认证路由
const BilibiliFollowInfoRouter = require('./Modules/BilibiliFollowInfoRouter'); // B站关注的漫画路由

// 导出模块
module.exports = {
    TechnologyStack,
    WebPushRouter,
    ImgVerifyRouter,
    EmailVerifyRouter,
    UserRouter,
    SuperUserRouter,
    superServerStatus,
    SuperUserManageRouter,
    SuperGithubRouter,
    SuperFileRouter,
    SuperSystemConfigRouter,
    SuperAccessRouter,
    SuperAuthenticationRouter,
    BilibiliFollowInfoRouter
};
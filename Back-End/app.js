// 导入Koa框架
const Koa = require('koa');
// 导入Koa路由模块
const Router = require('@koa/router');
// 导入跨域cors
const cors = require('@koa/cors');
// 导入Koa-bodyparser
const bodyParser = require('koa-bodyparser');
// 导入Koa-compress
const compress = require('koa-compress');
// 导入Koa-helmet
const helmet = require('koa-helmet');

// 插件
// 获取环境变量插件
const dotenv = require('dotenv');

// 创建一个Koa对象表示web app本身
const app = new Koa();
// 创建一个Router对象表示web app的路由
const router = new Router();

// 升级https
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
};

// 读取环境变量
dotenv.config();

// 检测是否安装成功Koa
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// 检查路由的正常(GET)
// router.get('/test/get', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 检查路由的正常(POST)
// router.post('/test/post', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 导入路由
const { TechnologyStack,WebPushRouter,ImgVerifyRouter, EmailVerifyRouter,UserRouter } = require('./router/index');
// 使用跨域
app.use(cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // 允许所有域名访问
    origin: function (ctx) {
        return ctx.header.origin;
    }
}));

// 使用bodyparser
app.use(bodyParser());
// 使用 koa-compress 中间件
app.use(compress({
    threshold: 1024, // 超过 1KB 才进行压缩
    flush: require('zlib').Z_SYNC_FLUSH, // 立即刷新压缩数据
    gzip: {
        level: 9 // gzip 压缩级别，范围 0-9，越高压缩率越大
    }
}));
// 使用koa-helmet
app.use(helmet());

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());
app.use(TechnologyStack.routes()); // 技术栈图片路由
app.use(WebPushRouter.routes()); // WebPush路由
app.use(ImgVerifyRouter.routes()); // 图形验证码路由
app.use(EmailVerifyRouter.routes()); // 邮箱验证码路由
app.use(UserRouter.routes()); // 用户路由

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));


// 监听端口
// app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server is running at http://localhost:${process.env.SERVER_PORT}`);
// });

// 升级https
https.createServer(options, app.callback()).listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.SERVER_PORT}`);
});
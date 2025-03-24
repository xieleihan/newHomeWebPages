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
const { exec } = require('child_process');
// 导入jsonwebtoken
const jwt = require('jsonwebtoken');

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

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

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
const { TechnologyStack, WebPushRouter, ImgVerifyRouter, EmailVerifyRouter, UserRouter, SuperUserRouter, superServerStatus,SuperUserManageRouter } = require('./router/index');
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
app.use(SuperUserRouter.routes()); // 超级用户路由
app.use(superServerStatus.routes()); // 服务器状态路由
app.use(SuperUserManageRouter.routes()); // 超级用户管理路由

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));


// 监听端口
// app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server is running at http://localhost:${process.env.SERVER_PORT}`);
// });

let logs = []; // 用于存储日志
// 备份原始 console.log
const originalLog = console.log;
const originalError = console.error;

// 拦截 console.log 并存储日志
console.log = (...args) => {
    const message = `[LOG] ${new Date().toISOString()} - ${args.join(" ")}`;
    logs.push(message);
    originalLog.apply(console, args); // 仍然打印到终端
};

// 拦截 console.error 并存储日志
console.error = (...args) => {
    const message = `[ERROR] ${new Date().toISOString()} - ${args.join(" ")}`;
    logs.push(message);
    originalError.apply(console, args);
};

router.get("/logs", async (ctx) => {
    ctx.body = logs.slice(-200); // 只返回最近 50 条日志，避免数据过大
});

// 重启服务
router.post('/reset', async (ctx) => {
    const token = ctx.header.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });
    ctx.status = 200;
    ctx.body = { code: 200, message: '重置成功' };

    exec('pm2 restart app', (err, stdout, stderr) => {
        if (err) {
            console.error('重启失败:', err);
            return;
        }
        console.log('重启成功:', stdout);
    });
})

// 关闭服务
router.post('/stop', async (ctx) => {
    const token = ctx.header.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });
    ctx.status = 200;
    ctx.body = { code: 200, message: '停止成功' };

    exec('pm2 stop app', (err, stdout, stderr) => {
        if (err) {
            console.error('停止失败:', err);
            return;
        }
        console.log('停止成功:', stdout);
    });
});

// 升级https
https.createServer(options, app.callback()).listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.SERVER_PORT}`);
});
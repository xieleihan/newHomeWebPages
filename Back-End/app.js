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
const WebSocket = require('ws');
const axios = require('axios');
const path = require('path');

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

const getServerStatus = require('./utils/Modules/performance');

// 导入路由
const {
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
} = require('./router/index');
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
// app.use(helmet());


router.post('/proxy', async (ctx) => {
    const { url } = ctx.request.body;
    if (!url) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '缺少url参数' };
        return;
    }

    try {
        // 确保目录存在
        const saveDir = path.join(__dirname, 'public/static/bilibili');
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        // 从url里取文件名
        const fileName = path.basename(new URL(url).pathname);
        const filePath = path.join(saveDir, fileName);

        // 请求远程资源，保存为文件
        // 检查本地是否已经有相同文件名的文件
        if (!fs.existsSync(filePath)) {
            const response = await axios.get(url, {
                responseType: 'arraybuffer', // 二进制流
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            });

            fs.writeFileSync(filePath, response.data);
        }
        

        // 拼接静态访问路径（前提：Koa挂载了static目录）
        const fileUrl = `/static/bilibili/${fileName}`;

        ctx.body = {
            code: 200,
            message: '下载成功',
            url: fileUrl
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, message: '请求失败', error: error.message };
    }
});

router.post('/verifyFriend', async (ctx) => {
    const { password } = ctx.request.body; // 前端传递过来的密码
    console.log('收到的密码:', password);
    const FRIEND_PASSWORD = process.env.FRIEND_PASSWORD; // 预设的密码，存储在环境变量中
    if (password === null) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '缺少密码参数' };
        return;
    } else {
        if (password == FRIEND_PASSWORD) {
            ctx.body = { code: 200, message: '验证成功',imgUrl: '/static/wechat.jpg' };
        } else {
            ctx.status = 401;
            ctx.body = { code: 401, message: '密码错误' };
        }
    }
})

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
app.use(SuperGithubRouter.routes()); // Github路由
app.use(SuperFileRouter.routes()); // 文件路由
app.use(SuperSystemConfigRouter.routes()); // 系统配置路由
app.use(SuperAccessRouter.routes()); // 访问路由
app.use(SuperAuthenticationRouter.routes()); // 认证路由
app.use(BilibiliFollowInfoRouter.routes()); // B站关注的信息路由

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

const server = https.createServer(options, app.callback());
const wss1 = new WebSocket.Server({ noServer: true });
const getServerStatusWss = new WebSocket.Server({ noServer: true });

// 拦截 console.log 并存储日志
console.log = (...args) => {
    const message = `[LOG] ${new Date().toISOString()} - ${args.join(" ")}`;
    logs.push(message);
    originalLog.apply(console, args); // 仍然打印到终端
    wss1.clients.forEach((client) => {
        client.send(JSON.stringify(logs));
    })
};

// 拦截 console.error 并存储日志
console.error = (...args) => {
    const message = `[ERROR] ${new Date().toISOString()} - ${args.join(" ")}`;
    logs.push(message);
    originalError.apply(console, args);
    wss1.clients.forEach((client) => {
        client.send(JSON.stringify(logs));
    })
};

router.get("/logs", async (ctx) => {
    const token = ctx.header.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });
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
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
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
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
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

router.get('/processes', async (ctx) => {
    const psList = (await import('ps-list')).default;
    const processes = await psList();
    ctx.body = {
        total: processes.length,
        list: processes.slice(0, 10) // 只返回前 10 个进程
    };
});

// 升级https
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.SERVER_PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    const { url } = request;
    if (url === '/logs') {
        wss1.handleUpgrade(request, socket, head, (ws) => {
            wss1.emit('connection', ws, request);
        });
    } else if (url === '/private/superServerStatus') {
        getServerStatusWss.handleUpgrade(request, socket, head, (ws) => {
            getServerStatusWss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss1.on('connection', (ws) => {
    // 连接成功后，发送最近的日志
    ws.send(JSON.stringify(logs.slice(-200)));
});

// WebSocket 连接
getServerStatusWss.on('connection', async (ws) => {
    console.log('WebSocket 客户端已连接');

    // 发送初始数据
    ws.send(JSON.stringify(await getServerStatus()));

    // 每 1 秒发送一次服务器状态更新
    const interval = setInterval(async () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(await getServerStatus()));
        } else {
            clearInterval(interval);
        }
    }, 1000);

    // 关闭连接时清理定时器
    ws.on('close', () => {
        console.log('WebSocket 连接关闭');
        clearInterval(interval);
    });
});
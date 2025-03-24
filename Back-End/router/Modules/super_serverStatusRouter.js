// 导入Koa Router
const Router = require('@koa/router');
// 导入jsonwebtoken
const jwt = require('jsonwebtoken');
// 导入环境变量
const dotenv = require('dotenv');
const os = require('os');

// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

router.get('/superServerStatus', async (ctx) => {
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

    const usedMemPercentage = (os.totalmem() - os.freemem()) / os.totalmem() * 100;
    const freeMemPercentage = os.freemem() / os.totalmem() * 100;

    // CPU占用率
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;
    for (let i = 0, len = cpus.length; i < len; i++) {
        const cpu = cpus[i];
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    const idle = totalIdle / cpus.length;
    const tick = totalTick / cpus.length;
    const cpuUsage = 100 - (idle / tick) * 100;

    ctx.status = 200;
    ctx.body = {
        code: 200,
        message: '获取服务器状态成功',
        data: {
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),
            arch: os.arch(),
            cpus: os.cpus(),
            totalmem: os.totalmem(),
            freemem: os.freemem(),
            loadavg: os.loadavg(),
            networkInterfaces: os.networkInterfaces(),
            usedMemPercentage: usedMemPercentage.toFixed(2),
            freeMemPercentage: freeMemPercentage.toFixed(2),
            cpuUsage: cpuUsage.toFixed(2)
        }
    };
});

module.exports = router;
// 导入Koa Router
const Router = require('@koa/router');
// 导入jsonwebtoken
const jwt = require('jsonwebtoken');
// 导入环境变量
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

router.get('/getEnvConfig', async (ctx) => {
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
    const envConfig = {
        SERVER_PORT: process.env.SERVER_PORT,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: null,
        WEBPUSH_PUBLIC_KEY: null,
        WEBPUSH_PRIVATE_KEY: null,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PASSWORD: null,
        REDIS_DB: null,
        SECRET_KEY: null,
        EMAIL: process.env.EMAIL,
        EMAIL_PASSWORD: null,
        BASE_URL: process.env.BASE_URL,
        GITHUB_TOKEN: null,
        GITHUB_OWNER: process.env.GITHUB_OWNER,
        GITHUB_REPO: process.env.GITHUB_REPO,
    };

    ctx.status = 200;
    ctx.body = {
        code: 200,
        data: envConfig,
        message: '获取环境变量成功'
    };
});

module.exports = router;
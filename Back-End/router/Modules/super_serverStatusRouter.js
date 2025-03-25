// 导入Koa Router
const Router = require('@koa/router');
// 导入jsonwebtoken
const jwt = require('jsonwebtoken');
// 导入环境变量
const dotenv = require('dotenv');
const getServerStatus = require('../../utils/Modules/performance');

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

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        code: 200,
        message: '获取服务器状态成功',
        data: getServerStatus()
    };
});

module.exports = router;
// 导入Koa Router
const Router = require('@koa/router');
// 导入环境变量
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// 导入连接池
const { pool } = require('../../db/index');
// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

router.get('/getChinaAccessList', async (ctx) => {
    const token = ctx.header.authorization;
    
        if (!token) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '未登录' };
            return;
        }
    
        try {
            jwt.verify(token, SECRET_KEY);
        } catch {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期' };
            return;
    }
    
    try {
        const [chinaDataList] = await pool.query('SELECT * FROM chinaaccess');
        ctx.status = 200;
        ctx.body = { code: 200, chinaDataList };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '服务器错误' };
    }
});

module.exports = router;
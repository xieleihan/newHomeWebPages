// 导入Koa Router
const Router = require('@koa/router');
// 导入连接池
const { pool } = require('../../db/index');
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

router.get('/userManage', async (ctx) => {
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

    const sql = `SELECT * FROM user_info`;
    const [res] = await pool.query(sql);

    ctx.status = 200;
    ctx.body = {
        code: 200,
        message: '获取用户列表成功',
        data: res
    };
})

module.exports = router;
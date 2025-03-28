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

router.post('/authentication', async (ctx) => {
    const {token} = ctx.request.body;
    if(token === '') {
        ctx.status = 400;
        ctx.body = { code: 400, message: 'token不能为空' };
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // 解析
        const username = decoded.username;
        // 查询数据库中是否存在这个用户
        const sql = `SELECT * FROM super_admin WHERE superusername = ?`;
        const [result] = await pool.execute(sql, [username]);
        if(result.length === 0) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '用户不存在' };
            return;
        }
        ctx.status = 200;
        ctx.body = { code: 200, message: 'token验证成功' };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器异常' };
    }
})

module.exports = router;
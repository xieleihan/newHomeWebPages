// 导入Koa Router
const Router = require('@koa/router');
// 导入连接池
const { pool } = require('../../db/index');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 导入jsonwebtoken
const jwt = require('jsonwebtoken');
// 导入环境变量
const dotenv = require('dotenv');

// 导入请求
const { verifyImgCode } = require('../../api/request');

// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

router.post('/superLogin', async (ctx) => {
    const { username, userpassword, key, code } = ctx.request.body;

    if (username === '' || userpassword === '' || key === '' || code === '') {
        ctx.status = 400;
        if (username === '') {
            ctx.body = { code: 400, message: '用户名不能为空' };
        } else if (userpassword === '') {
            ctx.body = { code: 400, message: '密码不能为空' };
        } else if (key === '') {
            ctx.body = { code: 400, message: 'Redis的key不能为空' };
        } else {
            ctx.body = { code: 400, message: '图片验证码不能为空' };
        }
        return;
    }

    // 检查username和userpassword,有无非法字符
    const reg = /^[a-zA-Z0-9_*]{6,16}$/;
    if (!reg.test(username) || !reg.test(userpassword)) {
        ctx.status = 400;
        if (!reg.test(username)) {
            ctx.body = { code: 400, message: '用户名不合法' };
        } else {
            ctx.body = { code: 400, message: '密码不合法' };
        }
        return;
    }

    // 检验图片验证码
    const verifyImgRes = await verifyImgCode({ key, code });
    if (verifyImgRes.data.code !== 200) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '验证码错误' };
        return;
    }


    // 查询数据库
    const sql = "SELECT * FROM super_admin WHERE superusername = ?";
    try {
        const [res] = await pool.query(sql, [username]);
        if (res.length === 0) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '账户不存在' };
            return;
        }
        
        // 验证密码
        if (bcrypt.compareSync(userpassword, res[0].superuserpassword)) {
            // 生成token
            const token = jwt.sign({ username: res[0].superusername }, SECRET_KEY, { expiresIn: '12h' });
            ctx.status = 200;
            ctx.body = { code: 200, message: '登录成功', token };
        } else {
            ctx.status = 400;
            ctx.body = { code: 400, message: '密码错误' };
        }
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误' };
    }
})

router.post('/superChangePassword', async (ctx) => {
    const { oldPassword, newPassword } = ctx.request.body;
    const token = ctx.header.authorization;

    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    // 解析 token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;

        // 查询数据库是否存在该用户
        const sql = "SELECT * FROM super_admin WHERE superusername = ?";
        const [res] = await pool.query(sql, [username]);

        if (res.length === 0) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '账户不存在' };
            return;
        }

        const user = res[0];

        // 验证旧密码
        const isPasswordValid = await bcrypt.compare(oldPassword, user.superuserpassword);
        if (!isPasswordValid) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '密码错误' };
            return;
        }

        // 加密新密码
        const hash = await bcrypt.hash(newPassword, 10);

        // 更新数据库
        const updateSql = "UPDATE super_admin SET superuserpassword = ? WHERE superusername = ?";
        await pool.query(updateSql, [hash, username]);

        ctx.status = 200;
        ctx.body = { code: 200, message: '修改成功' };

    } catch (error) {
        console.error('修改密码错误:', error);
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误' };
    }
});


module.exports = router;
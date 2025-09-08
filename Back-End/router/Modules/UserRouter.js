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
const { verifyImgCode, verifyEmailCode } = require('../../api/request');

// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const saltRounds = 10; // 定义密码加密的 salt 轮数
const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

// 注册
router.post('/register', async (ctx) => {
    const { username, userpassword, key, code, useremail,verifyCode } = ctx.request.body;
    
    if(username === '' || userpassword === '' || key === '' || code === '' || useremail === '' || verifyCode === '') {
        ctx.status = 400;
        if (username === '') {
            ctx.body = { code: 400, message: '用户名不能为空' };
        } else if(userpassword === '') {
            ctx.body = { code: 400, message: '密码不能为空' };
        } else if (useremail === '') {
            ctx.body = { code: 400, message: '邮箱不能为空' };
        } else if (key === '') {
            ctx.body = { code: 400, message: 'Redis的key不能为空' };
        } else if (verifyCode === '') {
            ctx.body = { code: 400, message: '邮箱验证码不能为空' };
        }else {
            ctx.body = { code: 400, message: '图片验证码不能为空' };
        }
        return;
    }

    // 检查username和userpassword,有无非法字符
    const reg = /^[a-zA-Z0-9_*]{6,16}$/;
    if(!reg.test(username) || !reg.test(userpassword)) {
        ctx.status = 400;
        if(!reg.test(username)) {
            ctx.body = { code: 400, message: '用户名不合法' };
        } else {
            ctx.body = { code: 400, message: '密码不合法' };
        }
        return;
    }

    // 检查useremail是否合法
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailReg.test(useremail)) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '邮箱不合法' };
        return;
    }

    // 检查用户名和邮箱是否已经注册
    const checkUserSql = "SELECT * FROM user WHERE username = ?";
    const checkEmailSql = "SELECT * FROM user WHERE useremail = ?";

    try {
        const [checkUserRes] = await pool.query(checkUserSql, [username]);
        if(checkUserRes.length > 0) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '用户名已存在' };
            return;
        }
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '查询用户名出错' };
        return;
    }
    try {
        const [checkEmailRes] = await pool.query(checkEmailSql, [useremail]);
        if(checkEmailRes.length > 0) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '邮箱已存在' };
            return;
        }
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '查询邮箱出错' };
        return;
    }

    // 检查图片验证码
    const verifyImgRes = await verifyImgCode({ key, code });
    // 检查邮箱验证码
    const verifyEmailRes = await verifyEmailCode({ email: useremail, code: verifyCode });

    if (verifyImgRes.data.code !== 200) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '图片验证码错误' };
        return;
    }
    if (verifyEmailRes.data.code !== 200) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '邮箱验证码错误' };
        return;
    }
    // 生成盐
    const salt = bcrypt.genSaltSync(saltRounds);
    // 加密密码
    const hash = bcrypt.hashSync(userpassword, salt);
    // 插入数据库
    try {
        const sql = "INSERT INTO user (username, useremail, userpassword) VALUES (?, ?, ?)";
        await pool.query(sql, [username, useremail, hash]);
        // 返回数据
        ctx.status = 200;
        ctx.body = { code: 200, message: '注册成功' };
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误' };
    }
})

// 登录
router.post('/login', async (ctx) => {
    const { useremail, userpassword, key, code, verifyCode } = ctx.request.body;
    
    if(useremail === '' || userpassword === '' || key === '' || code === '' || verifyCode === '') {
        ctx.status = 400;
        if (useremail === '') {
            ctx.body = { code: 400, message: '邮箱不能为空' };
        } else if(userpassword === '') {
            ctx.body = { code: 400, message: '密码不能为空' };
        } else if (key === '') {
            ctx.body = { code: 400, message: 'Redis的key不能为空' };
        } else if (verifyCode === '') {
            ctx.body = { code: 400, message: '邮箱验证码不能为空' };
        } else {
            ctx.body = { code: 400, message: '图片验证码不能为空' };
        }
        return;
    }

    // 判断邮箱是否合法
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailReg.test(useremail)) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '邮箱不合法' };
        return;
    }

    // 密码是否合法
    const reg = /^[a-zA-Z0-9_*]{6,16}$/;
    if(!reg.test(userpassword)) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '密码不合法' };
        return;
    }

    // 检验图片验证码
    const verifyImgRes = await verifyImgCode({ key, code });
    if (verifyImgRes.data.code !== 200) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '验证码错误' };
        return;
    }
    // 检验邮箱验证码
    const verifyEmailRes = await verifyEmailCode({ useremail, verifyCode });
    if (verifyEmailRes.data.code !== 200) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '邮箱验证码错误' };
        return;
    }
    // 查询数据库
    const sql = "SELECT * FROM user WHERE useremail = ?";
    try {
        const res = await pool.query(sql, [useremail]);
        if(res.length === 0) {
            ctx.status = 400;
            ctx.body = { code: 400, message: '邮箱不存在' };
            return;
        }
        // 验证密码
        if(bcrypt.compareSync(userpassword, res[0].userpassword)) {
            // 生成token
            const token = jwt.sign({ useremail: res[0].useremail }, SECRET_KEY, { expiresIn: '12h' });
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

module.exports = router;
// 导入Koa Router
const Router = require('@koa/router');
// 导入crypto
const crypto = require('crypto');
// 导入Redis
const redis = require('../../db/redis');
const sendEmail = require('../../utils/Modules/mailer');

const router = new Router({
    prefix: '/emailVerify'
});

// 发送验证码
router.post('/sendEmail', async (ctx) => {
    const { email } = ctx.request.body;
    if(email === '') {
        ctx.status = 400;
        ctx.body = { code: 400, message: '邮箱不能为空' };
        return;
    }
    // 生成验证码crypto
    const code = crypto.randomBytes(3).toString('hex').slice(-6);
    console.log("这是邮箱验证码", code);
    
    // 存入Redis中,有效期5分钟
    try {
        await redis.setex(`emailVerify:${email}`, 300, code);
        try {
            await sendEmail(email, code);
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: '发送成功'
            }
        } catch {
            ctx.status = 500;
            ctx.body = { code: 500, message: '发送邮件失败' };
        }
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '存储Redis失败' };
        return;
    }
});

// 验证验证码
router.post('/verifyEmail', async (ctx) => {
    const { email, code } = ctx.request.body;
    if(email === '' || code === '') {
        ctx.status = 400;
        if(email === '') {
            ctx.body = { code: 400, message: '邮箱不能为空' };
        } else {
            ctx.body = { code: 400, message: '验证码不能为空' };
        }
        return;
    }
    try {
        const result = await redis.get(`emailVerify:${email}`);

        if(!result && result == null) {
            ctx.body = { code: 400, message: '验证码已过期' };
            return;
        }

        if(result === code) {
            ctx.status = 200;
            ctx.body = { code: 200, message: '验证成功' };
            // 删除验证码
            await redis.del(`emailVerify:${email}`);
        } else {
            ctx.body = { code: 400, message: '验证码错误' };
        }
    } catch {
        ctx.body = { code: 500, message: '服务器错误' };
    }
});

module.exports = router;
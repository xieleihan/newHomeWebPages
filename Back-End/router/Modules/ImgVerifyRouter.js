// 导入Koa Router
const Router = require('@koa/router');
const svgCaptcha = require('../../utils/Modules/SvgCaptcha');
const redis = require('../../db/redis');

const router = new Router({
    prefix: '/imgVerify'
});

// 生成图片验证码
router.get('/getImgVerify', async (ctx) => {
    try {
        // 生成验证码
        const svgInfo = svgCaptcha();
        console.log("验证码是:", svgInfo.text);
        try {
            // 设置键值
            const captchaKey = `captcha:${new Date().getTime()}`;
            // 存入Redis,设置10分钟到期(大小写敏感)
            await redis.setex(captchaKey, 600, svgInfo.text);
            ctx.status = 200;
            // 返回svg图片
            ctx.body = {
                code: 200,
                data: svgInfo.data,
                key: captchaKey
            }
        } catch {
            ctx.status = 500;
            ctx.body = {
                code: 500,
                message: "存储Redis失败"
            }
        }
    } catch {
        ctx.status = 500;
        ctx.body = {
            code: 500,
            message: "生成验证码信息失败"
        }
    }
});

// 验证图片验证码
router.post('/verifyImgCode', async (ctx) => {
    const { key, code } = ctx.request.body;

    if (!key || !code) {
        if (!key) {
            ctx.body = {
                code: 400,
                message: "Redis的key不能为空"
            }
        } else {
            ctx.body = {
                code: 400,
                message: "验证码不能为空"
            }
        }
        return;
    }

    try {
        // 从Redis获取验证码
        const storeCaptcha = await redis.get(key);
        if (!storeCaptcha && storeCaptcha == null) {
            ctx.body = {
                code: 400,
                message: "验证码已过期"
            }
            return;
        }

        // 大小写严格
        if (storeCaptcha === code) {
            // 验证通过后删除key对应的验证码
            await redis.del(key)
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: "验证成功"
            }
        }else {
            ctx.body = {
                code: 400,
                message: "验证码错误"
            }
        }
    } catch {
        ctx.body = {
            code: 500,
            message: "Redis错误"
        }
    }
});

module.exports = router;
// 导入Koa Router
const Router = require('@koa/router');
// 导入工具函数
const { getFollowManga } = require('../../utils/Modules/getFollow');
// 导入环境变量
const dotenv = require('dotenv');

const router = new Router({
    prefix: '/public'
});

const uid = process.env.MY_BILIBILI_UID; // B站用户UID

router.get('/getMyFollowManga', async (ctx) => {
    try {
        const data = await getFollowManga(uid);
        ctx.status = 200;
        ctx.body = { code: 200, data };
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误' };
    }
});

module.exports = router;
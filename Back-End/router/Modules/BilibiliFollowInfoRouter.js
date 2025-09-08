// 导入Koa Router
const Router = require('@koa/router');
// 导入工具函数
const { getFollowAnime, getFollowMovie } = require('../../utils/Modules/getFollow');
// 导入环境变量
const dotenv = require('dotenv');
dotenv.config(); // 加载环境变量

const router = new Router({
    prefix: '/public'
});

const uid = process.env.MY_BILIBILI_UID; // B站用户UID

router.get('/getMyFollowAnime', async (ctx) => {
    try {
        if (!uid) {
            throw new Error('MY_BILIBILI_UID 环境变量未设置');
        }
        const data = await getFollowAnime(uid);
        ctx.status = 200;
        ctx.body = { code: 200, data };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误: ' + error.message };
    }
});

router.get('/getMyFollowMovie', async (ctx) => {
    try {
        if (!uid) {
            throw new Error('MY_BILIBILI_UID 环境变量未设置');
        }
        const data = await getFollowMovie(uid);
        ctx.status = 200;
        ctx.body = { code: 200, data };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器错误: ' + error.message };
    }
});

module.exports = router;
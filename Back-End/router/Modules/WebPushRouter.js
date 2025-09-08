// 导入Koa Router
const Router = require('@koa/router');
// 导入WebPush
const webpush = require('web-push');
// 导入环境变量
const dotenv = require('dotenv');
// 导入连接池
const {pool} = require('../../db/index');

// 创建一个Router对象表示web app的路由
const router = new Router({
    prefix: '/public'
});

// 读取环境变量
dotenv.config();

//设置VAPID
const vapidKeys = {
    publicKey: process.env.WEBPUSH_PUBLIC_KEY,
    privateKey: process.env.WEBPUSH_PRIVATE_KEY
}

// 设置VAPID Details
webpush.setVapidDetails(
    'mailto:1337141536@qq.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// 订阅
router.post("/subscribe", async (ctx) => {
    try {
        const { endpoint, keys } = ctx.request.body;

        // 查询是否已存在
        const sql = "SELECT * FROM webpush WHERE endpoint = ?";
        const [result] = await pool.query(sql, [endpoint]);

        if (result.length > 0) {
            ctx.body = { code: 403, message: "已经订阅" };
            return;
        }

        // 插入新订阅
        const insertSql = "INSERT INTO webpush (endpoint, p256dh, auth) VALUES (?, ?, ?)";
        await pool.query(insertSql, [endpoint, keys.p256dh, keys.auth]);

        ctx.body = { code: 200, message: "订阅成功" };
    } catch (error) {
        console.error("数据库错误:", error);
        ctx.body = { code: 500, message: "服务器错误" };
    }
});

// 发送通知
router.post("/sendNotification", async (ctx) => {
    try {
        const { title, message } = ctx.request.body;

        // 查询所有订阅
        const sql = "SELECT * FROM webpush";
        const [result] = await pool.query(sql);

        // 发送通知
        result.forEach(async (row) => {
            const subscription = {
                endpoint: row.endpoint,
                keys: {
                    p256dh: row.p256dh,
                    auth: row.auth
                }
            };

            await webpush.sendNotification(subscription, JSON.stringify({ title, message }));
        });

        ctx.body = { code: 200, message: "发送成功" };
    } catch (error) {
        console.error("数据库错误:", error);
        ctx.body = { code: 500, message: "服务器错误" };
    }
});

// 导出路由
module.exports = router;
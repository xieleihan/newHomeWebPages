// 导入Koa Router
const Router = require('@koa/router');
// 导入连接池
const { pool } = require('../../db/index'); // 引入连接池模块
const router = new Router({
    prefix: '/static'
});

router.get('/getTechnologyStack', async (ctx) => {
    try {
        const [rows] = await pool.query('SELECT * FROM technology_stack');
        // 转换数据格式
        const data = [];
        for (let i = 0; i < rows.length; i += 2) {
            data.push({
                label1: { fileName: rows[i].filename, bgColor: rows[i].bgColor },
                label2: { fileName: rows[i + 1]?.filename || '', bgColor: rows[i + 1]?.bgColor || '' }
            });
        }

        ctx.status = 200;
        ctx.body = { code:200,data };
    } catch {
        ctx.status = 500;
        ctx.body = { code:500,message: '服务器错误' };
    }
});

module.exports = router;
// 导入Koa Router
const Router = require('@koa/router');
// 导入环境变量
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

router.post('/sshCodeSend', async (ctx) => {
    
})

module.exports = router;
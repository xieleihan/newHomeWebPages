// 导入ioredis
const Redis = require('ioredis');
// 导入dotenv
const dotenv = require('dotenv');

// 读取环境变量
dotenv.config();

const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis端口
    host: process.env.REDIS_HOST, // Redis地址
    password: process.env.REDIS_PASSWORD, // Redis密码
    db: process.env.REDIS_DB, // Redis数据库索引
})

module.exports = redis;
const axios = require('axios');
const https = require('https');
const dotenv = require('dotenv'); // 导入dotenv模块
dotenv.config(); // 读取环境变量

const github_token = process.env.GITHUB_TOKEN;

// 创建axios实例
const service = axios.create({
    timeout: 30000, // 请求超时时间
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // 忽略 SSL 证书验证
    }),
    // 禁用代理，确保直接连接
    proxy: false,
    // 强制使用IPv4以避免DNS解析问题
    family: 4
});

// request拦截器
service.interceptors.request.use(
    config => {
        const addGithubTokenDomain = 'https://api.github.com';
        const bilibiliDomain = 'https://api.bilibili.com';

        if (config.url.startsWith(addGithubTokenDomain)) {
            // 可以在这里添加请求头等
            // config.headers['Authorization'] = `token ${}`;
            config.headers['Authorization'] = `token ${github_token}`;
        }

        // B站API专用请求头
        if (config.url.startsWith(bilibiliDomain)) {
            config.headers['Referer'] = 'https://www.bilibili.com/';
            config.headers['Origin'] = 'https://www.bilibili.com';
            // 删除可能导致问题的 Content-Type
            delete config.headers['Content-Type'];
        }

        // 指定类型
        // config.headers['Content-Type'] = 'application/json';
        config.url = config.url ? config.url.trim() : config.url;
        config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36';
        console.log("这是请求:", config);
        return config;
    },
    error => {
        // 请求错误处理
        // console.log('请求错误', error);
        return Promise.reject(error);
    }
);

// response拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log("这是响应:", res);
        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            console.log('请求超时');
        }
        return Promise.reject(error);
    }
);

module.exports = service;
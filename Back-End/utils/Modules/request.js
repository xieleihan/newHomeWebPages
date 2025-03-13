const axios = require('axios');

// 创建axios实例
const service = axios.create({
    timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等
        // config.headers['Authorization'] = `token ${}`;
        // console.log("这是请求:", config);
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
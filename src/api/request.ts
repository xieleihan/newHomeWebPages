import { getOut,post,get } from './index';

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params: any) {
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 注册Web push
 * @param data 
 * @returns 
 */
export const sendSubscription = function (data: any) {
    return post('/public/subscribe', data);
}

/**
 * 获取技术栈图片
 * @param {object} params
 * @returns res.data
 */
export const getTechnologyStack = function (params: any) {
    return get('/static/getTechnologyStack', params);
}

/**
 * 获取书库的内容
 * @param {object} params
 * @returns res.data
 */
export const getBookFlowInfo = function (params: any) {
    return getOut('https://localhost:5173/json/book.json', params);
}
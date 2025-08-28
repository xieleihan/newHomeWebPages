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

/**
 * 生成图片验证码
 * @param params 不用填入参数
 * @returns data 图片svg code 响应码 key redis的key
 */
export const getImgVerify = function (params: any) {
    return get('/imgVerify/getImgVerify', params);
}

/**
 * 发送邮件验证码
 * @param data 
 * @returns 
 */
export const sendEmail = function (data: any) {
    return post('/emailVerify/sendEmail', data);
}

/**
 * 获取自己的b站追番列表
 */
export const getMyBilibiliFollowAnime = function (params: any) {
    return get('/public/getMyFollowAnime', params);
}
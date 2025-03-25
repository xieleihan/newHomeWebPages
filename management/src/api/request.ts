import { post, get } from './index';

/**
 * 登录
 */
export const login = (data: any) => {
    return post('/private/superLogin', data);
}

/**
 * 获取日志信息
 */
export const getLogList = (params: any) => {
    return get('/logs', params);
}

/**
 * 获取图片验证码的图片
 */
export const getImgVerify = (params:any) => {
    return get('/imgVerify/getImgVerify',params);
}

/**
 * 获取服务器状态
 */
export const getServerStatus = (params:any) => {
    return get('/private/superServerStatus',params);
}

/**
 * 获取进程列表
 */
export const getProcessList = (params: any) => {
    return get('/processes', params);
}

/**
 * 修改登录密码
 */
export const changePassword = (data: any) => {
    return post('/private/superChangePassword', data);
}
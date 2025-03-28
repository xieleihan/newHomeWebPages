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

/**
 * 获取文件信息
 */
export const getCountFileType = (params: any) => { 
    return get('/private/file-stats', params);
}

/**
 * 读取环境变量
 */
export const getEmvList = (params: any) => {
    return get('/private/getEnvConfig', params);
}

/**
 * 重启
 */
export const sendReset = (data: any) => { 
    return post('/reset', data);
}

/**
 * 关机
 */
export const sendShutdown = (data: any) => {
    return post('/stop', data);
}

/**
 * 获取提交记录
 */
export const getCommitList = (params: any) => {
    return get('/private/getCommit', params);
}

/**
 * 获取中国访问数据
 */
export const getChinaAccessList = (params: any) => {
    return get('/private/getChinaAccessList', params);
}

/**
 * 检验Token是否有效
 */
export const checkToken = (data:any) => {
    return post('/private/authentication', data);
}
import { post, get } from './index';

/**
 * 登录
 */
export const login = (data: any) => {
    return post('/private/superLogin', data);
}

/**
 * 获取图片验证码的图片
 */
export const getImgVerify = (params:any) => {
    return get('/imgVerify/getImgVerify',params);
}
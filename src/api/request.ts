import { getOut } from './index';

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params: any) {
    return getOut('https://api.vore.top/api/IPdata', params);
}
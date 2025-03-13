import { axiosGet,axiosPost } from './index';

/**
 * 获取图片验证码
 * @param {*} params 可不传
 * @returns {object} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.data 返回图片验证码
 * @returns {string} data.key 返回Redis的键
 */
function getImgVerify(params) {
    return axiosGet('/getImgVerify',params);
}

/**
 * 验证图片验证码
 * @param {*} data 
 * @returns {obejct} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.message 返回信息
 */
function verifyImgCode(data) {
    return axiosPost('/verifyImgCode',data);
}

module.exports = {
    getImgVerify,
    verifyImgCode
}
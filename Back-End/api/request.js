const { axiosGet, axiosPost } = require('./index');

/**
 * 获取图片验证码
 * @param {*} params 可不传
 * @returns {object} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.data 返回图片验证码
 * @returns {string} data.key 返回Redis的键
 */
function getImgVerify(params) {
    return axiosGet('/imgVerify/getImgVerify',params);
}

/**
 * 验证图片验证码
 * @param {String} key Radis的键
 * @param {String} code 验证码
 * @returns {obejct} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.message 返回信息
 */
function verifyImgCode(data) {
    return axiosPost('/imgVerify/verifyImgCode',data);
}

/**
 * 发送邮箱验证码
 * @param {string} email 邮箱 
 * @returns {obejct} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.message 返回信息
 */
function sendEmailCode(data) {
    return axiosPost('/emailVerify/sendEmail', data);
}

/**
 * 验证邮箱验证码
 * @param {string} email 邮箱
 * @param {string} code 验证码
 * @returns {obejct} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.message 返回信息
 */
function verifyEmailCode(data) {
    return axiosPost('/emailVerify/verifyEmail', data);
}

module.exports = {
    getImgVerify,
    verifyImgCode,
    sendEmailCode,
    verifyEmailCode
}
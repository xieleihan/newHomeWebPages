const { axiosGet, axiosPost, axiosInternetGet } = require('./index');

/**
 * 获取图片验证码
 * @param {*} params 可不传
 * @returns {object} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.data 返回图片验证码
 * @returns {string} data.key 返回Redis的键
 */
function getImgVerify(params) {
    return axiosGet('/imgVerify/getImgVerify', params);
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
    return axiosPost('/imgVerify/verifyImgCode', data);
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

/**
 * 获取Github的Releases
 * @param {object} parmas 包含owner和name 
 * @returns 
 */
function getCommit(parmas) {
    return axiosInternetGet(`https://api.github.com/repos/${parmas.owner}/${parmas.name}/commits`, {});
}

/**
 * 获取Github的Commits
 * @param {object} parmas  包含owner和name
 * @returns 
 */
function getReleases(parmas) {
    return axiosInternetGet(`https://api.github.com/repos/${parmas.owner}/${parmas.name}/releases`, {});
}

/**
 * 获取b站uid用户的追番列表
 */
function getBiliFollowAnime(params) {
    return axiosInternetGet('https://api.bilibili.com/x/space/bangumi/follow/list', params);
}

/**
 * 获取b站uid用户的追电影列表
 */
function getBiliFollowMovie(params) {
    return axiosInternetGet('https://api.bilibili.com/x/space/bangumi/follow/list', params);
}

module.exports = {
    getImgVerify,
    verifyImgCode,
    sendEmailCode,
    verifyEmailCode,
    getCommit,
    getReleases,
    getBiliFollowAnime,
    getBiliFollowMovie
}
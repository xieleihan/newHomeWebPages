const axios = require('axios');
const { getBiliFollowAnime, getBiliFollowMovie } = require('../../api/request');

/**
 * 获取B站关注的动画
 */
async function getFollowAnime(uid) {
    let page = 1; // 当前页码
    const allData = []; // 存储所有数据

    while (true) {
        try {
            console.log(`正在请求第 ${page} 页动画...`);
            const response = await getBiliFollowAnime({ vmid: uid, pn: page, ps: 20, type: 1 });
            const data = response.data;

            if (data.code !== 0) {
                throw new Error(`API返回错误: ${data.message}`);
            }

            const items = data.data.list;
            allData.push(...items);

            if (items.length < 20) {
                break; // 如果当前页数据少于20条，说明已经是最后一页
            }

            page += 1; // 增加页码，继续请求下一页
        } catch (error) {
            console.error('请求失败:', error);
            break; // 出现错误时退出循环
        }
    }

    return allData;
}

async function getFollowMovie(uid) {
    let page = 1; // 当前页码
    const allData = []; // 存储所有数据

    while (true) {
        try {
            console.log(`正在请求第 ${page} 页电影...`);
            const response = await getBiliFollowMovie({ vmid: uid, pn: page, ps: 20, type: 2 });
            const data = response.data;

            if (data.code !== 0) {
                throw new Error(`API返回错误: ${data.message}`);
            }

            const items = data.data.list;
            allData.push(...items);

            if (items.length < 20) {
                break; // 如果当前页数据少于20条，说明已经是最后一页
            }

            page += 1; // 增加页码，继续请求下一页
        } catch (error) {
            console.error('请求失败:', error);
            break; // 出现错误时退出循环
        }
    }

    return allData;
}

module.exports = {
    getFollowAnime,
    getFollowMovie
};
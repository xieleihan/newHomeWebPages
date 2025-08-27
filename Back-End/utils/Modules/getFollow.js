const axios = require('axios');
const crypto = require('crypto');

// 获取WBI密钥的函数
async function getWbiKeys() {
    try {
        const response = await axios.get('https://api.bilibili.com/x/web-interface/nav', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        console.log(response);
        const data = response.data.data;
        // 从响应中提取wbi密钥
        return {
            img_key: data.wbi_img.img_url.split('/').pop().split('.')[0],
            sub_key: data.wbi_img.sub_url.split('/').pop().split('.')[0]
        };
    } catch (error) {
        console.error('获取WBI密钥失败:', error.message);
        // 返回默认密钥（可能已过期）
        return { img_key: 'default', sub_key: 'default' };
    }
}

// WBI签名算法
function encWbi(params, img_key, sub_key) {
    const mixin_key = img_key + sub_key;
    const sortedParams = Object.keys(params).sort();

    let queryString = '';
    for (const key of sortedParams) {
        queryString += `${key}=${params[key]}&`;
    }

    // 添加WBI签名
    const wts = Math.floor(Date.now() / 1000);
    queryString += `wts=${wts}`;

    // 生成w_rid
    const w_rid = crypto.createHash('md5').update(queryString + mixin_key).digest('hex');

    return queryString + `&w_rid=${w_rid}`;
}

/**
 * 获取B站关注的漫画
 */
async function getFollowManga(uid) {
    let page = 1; // 当前页码
    const allData = []; // 存储所有数据

    const { img_key, sub_key } = await getWbiKeys();
    const params = {
        vmid: uid,
        type: '1',
        pn: '1',
        ps: '15'
    };
    const signedParams = encWbi(params, img_key, sub_key);

    while (true) {
        const url = `https://api.bilibili.com/x/space/bangumi/follow/list?${signedParams}`;
        console.log(`请求URL: ${url}`);

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        
        try {
            console.log(`正在请求第${page}页...`);
            const response = await axios.get(url,{headers});
            console.log(response);
            if (response.status !== 200) {
                console.log(`HTTP请求失败，状态码: ${response.status}`);
                break;
            }

            const data = response.data;

            // 检查响应是否成功
            if (data.code !== 0 || !data.data) {
                console.log(`获取数据失败，code: ${data.code}, message: ${data.message}`);
                break;
            }

            // 检查是否有媒体数据
            if (!data.data.medias || data.data.medias.length === 0) {
                console.log('没有更多数据了');
                break;
            }

            allData.push(...data.data.medias);
            console.log(`已获取第${page}页数据，共${data.data.medias.length}条`);

            page += 1;

            // 添加延迟避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            console.error(`请求第${page}页失败:`, error.message);
            break;
        }
    }

    return allData;
}

/**
 * 获取B站关注的动画
 */
async function getFollowAnime() {
    
}

module.exports = {
    getFollowManga,
    getFollowAnime
};
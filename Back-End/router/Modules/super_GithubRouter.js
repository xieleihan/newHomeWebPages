// 导入Koa Router
const Router = require('@koa/router');
// 导入环境变量
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

// 导入请求
const { getCommit,getReleases } = require('../../api/request');

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥
const GITHUB_OWNER = process.env.GITHUB_OWNER; // 定义Github的用户名
const GITHUB_REPO = process.env.GITHUB_REPO; // 定义Github的仓库名

router.get('/getCommit', async (ctx) => {
    const token = ctx.header.authorization;

    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }

    try {
        jwt.verify(token, SECRET_KEY);
    } catch {
        ctx.status = 401;
        ctx.body = { code: 401, message: '登录过期' };
        return;
    }

    try {
        const response = await getCommit({ owner: GITHUB_OWNER, name: GITHUB_REPO });
        const commits = response.data.map(commit => ({
            sha: commit.sha,
            author: commit.commit.author.name,
            date: commit.commit.author.date,
            message: commit.commit.message,
            url: commit.html_url,
            author_avatar: commit.author.avatar_url
        }));

        ctx.status = 200;
        ctx.body = {
            code: 200,
            data: response.data,
            message: '获取commits成功',
            list: commits
        };
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '获取commits失败' };
    }
});

router.get('/getReleases', async (ctx) => {
    const token = ctx.header.authorization;

    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }

    try {
        jwt.verify(token, SECRET_KEY);
    } catch {
        ctx.status = 401;
        ctx.body = { code: 401, message: '登录过期' };
        return;
    }

    try {
        const response = await getReleases({ owner: GITHUB_OWNER, name: GITHUB_REPO });
        const releases = response.data.map(release => ({
            version: release.tag_name,
            name: release.name,
            published_at: release.published_at,
            release_notes: release.body,
        }));

        ctx.status = 200;
        ctx.body = {
            code: 200,
            data: releases
        };
    } catch {
        ctx.status = 500;
        ctx.body = { code: 500, message: '获取releases失败' };
    }
});

module.exports = router;
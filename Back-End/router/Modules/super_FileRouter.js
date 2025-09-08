// 导入Koa Router
const Router = require('@koa/router');
// 导入环境变量
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
// 加载环境变量
dotenv.config();

const router = new Router({
    prefix: '/private'
});

// 获取环境变量
const host = process.env.BASE_URL;

/**
 * 递归统计目录下的文件类型
 * @param {string} dirPath 目录路径
 * @returns {Promise<{fileCounts: Object, fileDetails: Array}>}
 */
const countFileTypes = async (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        return { error: "static 文件夹不存在" };
    }

    const fileCounts = {};
    const fileDetails = [];

    try {
        // 递归读取所有文件
        await processDirectory(dirPath, fileCounts, fileDetails);
        return { fileCounts, fileDetails };
    } catch (error) {
        console.error("读取文件夹失败:", error);
        return { error: "读取文件夹失败" };
    }
};

/**
 * 递归处理目录
 */
async function processDirectory(dirPath, fileCounts, fileDetails) {
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
        if (file.startsWith('.')) continue; // 跳过隐藏文件

        const filePath = path.join(dirPath, file);
        const stats = await fs.promises.stat(filePath);

        if (stats.isDirectory()) {
            // 如果是文件夹，递归处理
            await processDirectory(filePath, fileCounts, fileDetails);
        } else {
            // 如果是文件，统计信息
            const ext = path.extname(file).toLowerCase() || "无后缀";
            fileCounts[ext] = (fileCounts[ext] || 0) + 1;

            fileDetails.push({
                fileName: file,
                relativePath: path.relative(dirPath, filePath), // 相对路径
                extension: ext,
                createdTime: stats.birthtime.toISOString(),
                size: stats.size, // 文件大小（字节）
                openUrl: `${host}/${path.relative(path.join(__dirname, "../../public"), filePath).replace(/\\/g, '/')}`
            });
        }
    }
}

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

// 获取文件统计信息
router.get('/file-stats', async (ctx) => {
    const token = ctx.header.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });
    const staticPath = path.join(__dirname, "../../public/static"); // static 文件夹路径
    ctx.body = {
        code: 200,
        data: await countFileTypes(staticPath),
    };
});

// 删除某个文件(未验证)
router.post('/delete-file', async (ctx) => {
    const { filePath } = ctx.request.body;
    const token = ctx.header.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '未登录' };
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { code: 401, message: '登录过期，请重新登录' };
            return;
        }
    });

    try {
        await fs.promises.unlink(filePath);
        ctx.status = 200;
        ctx.body = { code: 200, message: '删除成功' };
    } catch (error) {
        console.error("删除文件失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: '删除失败' };
    }
});

module.exports = router;
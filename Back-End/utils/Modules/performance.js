const os = require('os');

/**
 * 获取 CPU 使用率
 * @param {number} interval 采样间隔（毫秒）
 * @returns {Promise<number>} CPU 使用率（百分比）
 */
const getCPUUsage = (interval = 1000) => {
    return new Promise((resolve) => {
        const startMeasure = os.cpus();

        setTimeout(() => {
            const endMeasure = os.cpus();
            let idleDiff = 0;
            let totalDiff = 0;

            for (let i = 0; i < startMeasure.length; i++) {
                const start = startMeasure[i].times;
                const end = endMeasure[i].times;

                const idleStart = start.idle;
                const idleEnd = end.idle;

                const totalStart = Object.values(start).reduce((acc, time) => acc + time, 0);
                const totalEnd = Object.values(end).reduce((acc, time) => acc + time, 0);

                idleDiff += idleEnd - idleStart;
                totalDiff += totalEnd - totalStart;
            }

            const cpuUsage = 100 - (idleDiff / totalDiff) * 100;
            resolve(cpuUsage.toFixed(2));
        }, interval);
    });
};

// 计算服务器状态信息
const getServerStatus = async () => {
    const usedMemPercentage = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
    const freeMemPercentage = (os.freemem() / os.totalmem()) * 100;

    let cpuUsed = 0;

    cpuUsed = await getCPUUsage();

    return {
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus(),
        totalmem: os.totalmem(),
        freemem: os.freemem(),
        loadavg: os.loadavg(),
        networkInterfaces: os.networkInterfaces(),
        usedMemPercentage: usedMemPercentage.toFixed(2),
        freeMemPercentage: freeMemPercentage.toFixed(2),
        cpuUsage: cpuUsed,
    };
};

module.exports = getServerStatus;
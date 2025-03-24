<template>
    <div class="systemLog" v-html="htmlStr">
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, onUnmounted } from 'vue';
// 导入请求
import { getLogList } from '../../api/request';

// 创建变量
const htmlStr = ref('<div>Windows PowerShell</div><div>版权所有（C） Microsoft Corporation。保留所有权利。</div><div>安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows</div><div>PS C:/\Users/\Administration/npm run dev</div><br />');

// 使用Set存储已添加的日志防止重复
const logSet = new Set<string>();

function updateLogs() {
    getLogList({}).then(res => {
        // 确保 res 是数组
        if (!Array.isArray(res)) return;

        let newLogs = '';

        res.forEach((item: any) => {
            if (!logSet.has(item)) {
                logSet.add(item);
                newLogs += `<div>${item}</div>`;
            }
        });

        // 只有有新内容时才更新
        if (newLogs) {
            htmlStr.value += newLogs;
        }
    });
}

let intervalId: any = null;

onMounted(() => {
    updateLogs();
    intervalId = setInterval(updateLogs, 5000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.systemLog{
    width: 100%;
    height: 100%;
    background-color: #0d1117;
    color: #fff;
    padding: .1rem;
    overflow-y: scroll;
}
</style>
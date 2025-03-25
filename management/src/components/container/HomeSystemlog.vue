<template>
    <div class="systemLog" v-html="htmlStr">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useWebSocket } from '../../api/websocket';

// 存储 WebSocket 实例
let wsConnection: any = null;

// HTML 内容
const htmlStr = ref('<div>Windows PowerShell</div><div>版权所有（C） Microsoft Corporation。保留所有权利。</div><div>安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows</div><div>PS C:/\Users/\Administration/npm run dev</div><br />');

// 防止重复日志
const logSet = new Set<string>();

// WebSocket 消息处理函数
const handleMessage = (message: string) => {
    try {
        const res = JSON.parse(message); // 假设消息是 JSON 格式

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
    } catch (error) {
        console.error('WebSocket 消息解析失败:', error);
    }
};

// 挂载时启动 WebSocket
onMounted(() => {
    wsConnection = useWebSocket('/logs', {
        onMessage: handleMessage, // 监听 WebSocket 消息
        onOpen: () => console.log('WebSocket 已连接'),
        onClose: () => console.log('WebSocket 已关闭'),
        onError: (error) => console.error('WebSocket 发生错误:', error),
    });
});

// 组件销毁时断开 WebSocket 连接
onUnmounted(() => {
    if (wsConnection) {
        wsConnection.close();
    }
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
    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
<template>
    <div class="serverStatus">
        <div class="system">
            <p class="title">服务器状态</p>
            <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                rules="rows"
            >
                <tr>
                    <td>主机名</td>
                    <td>{{ performanceData?.hostname }}</td>
                </tr>
                <tr>
                    <td>系统类型</td>
                    <td>{{ performanceData?.type }}</td>
                </tr>
                <tr>
                    <td>系统平台</td>
                    <td>{{ performanceData?.platform }}</td>
                </tr>
                <tr>
                    <td>系统架构</td>
                    <td>{{ performanceData?.arch }}</td>
                </tr>
                <tr>
                    <td>CPU型号</td>
                    <td v-if="performanceData?.cpus">{{ performanceData?.cpus[0].model }}</td>
                </tr>
                <tr>
                    <td>CPU核心数</td>
                    <td v-if="performanceData?.cpus">{{ performanceData?.cpus.length }}</td>
                </tr>
                <tr>
                    <td>CPU频率</td>
                    <td v-if="performanceData?.cpus">{{ performanceData?.cpus[0].speed }} MHz</td>
                </tr>
                <tr>
                    <td>CPU占用率</td>
                    <td style="width: fit-content;">
                        <el-progress
                            :text-inside="true"
                            :stroke-width="24"
                            :percentage="Number(cpuUsed)"
                            :status="getStatus(parseFloat(cpuUsed))"
                        />
                    </td>
                </tr>
                <tr>
                    <td>系统内存</td>
                    <td>{{ (performanceData?.totalmem / (1024 ** 3)).toFixed(2) }} GB</td>
                </tr>
                <tr>
                    <td>系统空闲内存</td>
                    <td>{{ (performanceData?.freemem / (1024 ** 3)).toFixed(2) }} GB</td>
                </tr>
                <tr>
                    <td>内存使用情况</td>
                    <td>
                        <el-progress
                            :text-inside="true"
                            :stroke-width="24"
                            :percentage="Number(performanceData?.usedMemPercentage)"
                            :status="getStatus(parseFloat(performanceData?.usedMemPercentage))"
                        />
                    </td>
                </tr>
                <tr>
                    <td>服务器IP</td>
                    <td v-if="performanceData?.networkInterfaces">{{ performanceData?.networkInterfaces.WLAN[0].address
                        }}</td>
                </tr>
                <tr>
                    <td>
                        网络协议
                    </td>
                    <td v-if="performanceData?.networkInterfaces">{{ performanceData?.networkInterfaces.WLAN[0].family
                        }}</td>
                </tr>
            </table>
        </div>
        <p style="font-size: 0.15rem;margin-top: .1rem;">进程信息</p>
        <el-table
            :data="processList"
            style="width: 100%;"
        >
            <el-table-column
                prop="pid"
                label="进程ID"
                width="200"
            />
            <el-table-column
                prop="ppid"
                label="父进程ID"
                width="200"
            />
            <el-table-column
                prop="name"
                label="进程名称"
            />
        </el-table>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useWebSocket } from '../../api/websocket';
// 导入请求
import { getProcessList } from '../../api/request';
// 存储 WebSocket 实例
let wsConnection: any = null;
const handleMessage = (message: string) => {
    performanceData.value = JSON.parse(message);
};

// 创建变量
const performanceData = ref<any>({});
const cpuUsed = ref(performanceData.value?.cpuUsage || '0');
const processList = ref(null);

function getStatus(number:number) {
    if (number < 50) {
        return 'success';
    } else if (number < 80) {
        return 'warning';
    } else {
        return 'exception'; 
    }
}

watchEffect(() => {
    cpuUsed.value = performanceData.value?.cpuUsage || '0';
});

onMounted(() => {
    wsConnection = useWebSocket('/private/superServerStatus', {
        onMessage: handleMessage, // 监听 WebSocket 消息
        onOpen: () => console.log('WebSocket 已连接'),
        onClose: () => console.log('WebSocket 已关闭'),
        onError: (error) => console.error('WebSocket 发生错误:', error),
    });

    getProcessList({}).then((res) => {
        let str = JSON.stringify(res);
        let obj = JSON.parse(str);
        processList.value = obj.list;
    });
})

onUnmounted(() => {
    if (wsConnection) {
        wsConnection.close();
    }
})
</script>

<style scoped lang="scss">
.serverStatus {
    width: 100%;
    height: 100%;
    padding: .1rem;
    overflow-y: scroll;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    .system {
        width: 100%;
    }

    .title {
        font-size: .15rem;

    }

    table {
        width: 100%;

        tr {
            width: 100%;

            &:nth-child(2n) {
                background-color: #f9f9f9;
            }

            td {
                font-size: .1rem;
                line-height: .3rem;
                padding: .01rem .05rem;
                height: .3rem;

                &:nth-child(2n) {
                    width: 75%;
                }

                img {
                    height: .3rem;
                    aspect-ratio: 1/1;
                }
            }
        }
    }
}
</style>
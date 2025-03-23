<template>
    <div class="overview">
        <div class="system">
            <p class="title">系统</p>
            <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                rules="rows"
            >
                <tr>
                    <td>系统名称</td>
                    <td>数通中台</td>
                </tr>
                <tr>
                    <td>浏览器信息</td>
                    <td>
                        <img
                            loading="lazy"
                            :src="browserImg"
                            alt="icon"
                        >
                        <span>{{ browserVersion }}</span>
                    </td>
                </tr>
                <tr>
                    <td>操作系统</td>
                    <td>
                        <img
                            loading="lazy"
                            :src="systemImg"
                            alt="icon"
                        >
                        <span>{{ systemVersion }}</span>
                    </td>
                </tr>
                <tr>
                    <td>用户代理</td>
                    <td>{{ userAgent }}</td>
                </tr>
            </table>
        </div>
        <div class="system">
            <p class="title">内存</p>
            <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                rules="rows"
            >
                <tr>
                    <td>总内存</td>
                    <td>{{ menoryTotal }}</td>
                </tr>
                <tr>
                    <td>可用数</td>
                    <td>
                        <span>{{ menoryAvailable }}</span>
                    </td>
                </tr>
                <tr>
                    <td>已使用</td>
                    <td>
                        <span>{{ menoryUsed }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getDeviceInfo } from '../../utils/index';

console.log(getDeviceInfo());

// 导入Vue
import { ref } from 'vue';

// 创建变量
const browserVersion = ref(getDeviceInfo().browserInfo.version || '未知');
const systemVersion = ref(getDeviceInfo().operatingSystem || '未知');
const userAgent = ref(getDeviceInfo().userAgent || '未知');
const menoryTotal = ref(getDeviceInfo().memoryInfo.total + "GB" || '未知');
const menoryAvailable = ref(getDeviceInfo().memoryInfo.limit + "GB" || '未知');
const menoryUsed = ref(getDeviceInfo().memoryInfo.used + "GB" || '未知');

const browserImg = ref(new URL(`../../assets/icon/${getDeviceInfo().browserInfo.browserName}.svg`, import.meta.url).href);
const systemImg = ref(new URL(`../../assets/icon/${getDeviceInfo().operatingSystem}.svg`, import.meta.url).href);
</script>

<style scoped lang="scss">
.overview {
    width: 100%;
    height: 100%;
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
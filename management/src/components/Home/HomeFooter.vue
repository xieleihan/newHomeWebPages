<template>
    <div class="footer">
        <div class="left">
            <div class="copyright">
                Copyright© 2025 SouthAki, All Rights Reserved.
            </div>
            <div class="icp">
                ICP备20231229号 | 网盾星球,提供CDN支持
            </div>
        </div>
        <div class="right">
            <p>开始逐光之旅的第：{{days}}天{{hours}}时{{minutes}}分{{seconds}}秒，愿在年少时期，你能路过我生命</p>
            <p>现在旅行者一号距离地球{{t}}千米，约为{{a}}个天文单位🚀</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, onUnmounted } from 'vue';
const creation_time = import.meta.env.VITE_CREATION_TIME;

// 创建变量
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const t = ref(0);
const a = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

// 生命周期
onMounted(() => {
    timer = setInterval(() => {
        // 获取现在时间
        const now = new Date();
        // 经过的时间
        const runTime = Math.floor((now.getTime() - new Date(creation_time).getTime()) / 1000);

        // 计算天数
        t.value = Math.trunc(234e8 + runTime / 1e3 * 17);
        a.value = parseFloat((t.value / 1496e5).toFixed(6));

        // 计算天数
        days.value = Math.trunc(runTime / 60 / 60 / 24);
        // 计算小时数
        hours.value = Math.trunc(runTime / 60 / 60 % 24);
        // 计算分钟数
        minutes.value = Math.trunc(runTime / 60 % 60);
        // 计算秒数
        seconds.value = Math.trunc(runTime % 60);
    }, 1000);
})

// 卸载生命周期
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
})
</script>

<style scoped lang="scss">
.footer{
    width: 100%;
    height: 100%;
    padding: 0 .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}
</style>
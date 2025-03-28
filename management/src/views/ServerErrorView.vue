<template>
    <div class="error">
        <div class="top">
            <div class="left">
                <img
                    class="logo"
                    loading="lazy"
                    src="../assets/icon/peacock_flat.png"
                    alt="logo"
                >
            </div>
            <div class="right">
                <span>当前时间:</span><span>{{ nowTime }}</span>
            </div>
        </div>
        <div class="container">
            <div class="topLeft">
                <img
                    loading="lazy"
                    src="../assets/icon/500.svg"
                    alt="Error"
                >
            </div>
            <div class="bottomRight">
                <div class="box">
                    <p class="title">服务器离线</p>
                    <p class="desc">别困扰,这是我们的问题,很快就好</p>
                </div>
                <el-button
                    @click="goToHome"
                    size="large"
                    type="primary"
                >返回首页</el-button>
            </div>
        </div>
        <div class="copyright">
            Copyright© 2025 SouthAki, All Rights Reserved. | 网盾星球,提供CDN服务
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, onMounted, onUnmounted } from 'vue';
// 导入Vue Router
import { useRouter } from 'vue-router';

// 创建变量
const nowTime = ref('');

// 格式化时间（补零）
const padZero = (num: number) => String(num).padStart(2, '0');

// 获取路由
const router = useRouter();

// 创建方法
const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());
    const second = padZero(date.getSeconds());
    const week = date.getDay();
    const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
    nowTime.value = `${year}-${month}-${day} ${hour}:${minute}:${second} 星期${weekArr[week]}`;
}

let intervalId: ReturnType<typeof setInterval> | null = null;

// 生命周期钩子
onMounted(() => {
    getTime();
    intervalId = setInterval(getTime, 1000);
    ElMessage({
        message: '服务器离线',
        type: 'error'
    });
});

// 卸载生命周期
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

function goToHome() {
    router.push('/home');
}
</script>

<style scoped lang="scss">
.error {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'zk';
    position: relative;

    .top {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: .1rem .2rem;
        height: .5rem;

        .left {
            .logo {
                width: .3rem;
                height: .3rem;
            }
        }

        .right {
            display: flex;
            align-items: center;
        }
    }

    .copyright {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: .1rem;

    }

    .container {
        width: 60%;
        height: 60%;
        display: flex;

        .topLeft {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .bottomRight {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;

            .box {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .title {
                    font-size: .3rem;
                    font-weight: bold;
                }

                .desc {
                    font-size: .1rem;
                    letter-spacing: .1rem;
                    color: #ccc;
                    margin-top: .1rem;
                }
            }
        }
    }
}
</style>
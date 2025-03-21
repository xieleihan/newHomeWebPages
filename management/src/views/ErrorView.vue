<template>
    <div class="error">
        <div class="top">
            <div class="left">
                <img class="logo" loading="lazy" src="../assets/icon/peacock_flat.png" alt="logo">
            </div>
            <div class="right">
                <span>当前时间:</span><span>{{ nowTime }}</span>
            </div>
        </div>
        <div class="container">
            <div class="topLeft">
                <img loading="lazy" src="../assets/icon/404.svg" alt="Error">
            </div>
            <div class="bottomRight">
                <div class="box">
                    <p class="title">网络错误</p>
                    <p class="desc">你来到无人问津的荒漠</p>
                </div>
                <el-button size="large" type="primary">返回首页</el-button>
            </div>
        </div>
        <div class="copyright">
            Copyright© 2025 SouthAki, All Rights Reserved. | 
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 创建变量
const nowTime = ref('');

// 格式化时间（补零）
const padZero = (num: number) => String(num).padStart(2, '0');

// 创建方法
const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());
    const second = padZero(date.getSeconds());
    nowTime.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

let intervalId: ReturnType<typeof setInterval> | null = null;

// 生命周期钩子
onMounted(() => {
    getTime();
    intervalId = setInterval(getTime, 1000);
});

// 卸载生命周期
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<style scoped lang="scss">
.error{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'zk';
    position: relative;
    .top{
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: .1rem .2rem;
        height: .5rem;
        .left{
            .logo{
                width: .3rem;
                height: .3rem;
            }
        }
        .right{
            display: flex;
            align-items: center;
        }
    }
    .copyright{
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: .1rem;

    }
    .container{
        width: 60%;
        height: 60%;
        display: flex;

        .topLeft{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bottomRight{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;
            .box{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .title{
                    font-size: .3rem;
                    font-weight: bold;
                }
                .desc{
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
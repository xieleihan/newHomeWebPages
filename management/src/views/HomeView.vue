<template>
    <div class="home">
        <el-container class="container">
            <el-header class="header">
                <HomeHeader />
            </el-header>
            <el-container class="main">
                <el-aside class="aside">
                    <HomeAside />
                </el-aside>
                <el-main class="content">
                    <div class="top">
                        <div class="left">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item
                                    v-for="(item, index) in breadcrumbList"
                                    :key="index"
                                    :to="index !== breadcrumbList.length - 1 ? item.path : null"
                                >
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                    <div class="bottom">
                        <div
                            v-if="!isOpenRouterView"
                            class="overflow"
                        >
                            <div class="box">
                                <div class="vue-top">
                                    <img
                                        @click="goToPages('https://cn.vite.dev/')"
                                        class="icon"
                                        src="/vite.svg"
                                        alt="Vite"
                                        loading="lazy"
                                    >
                                    <img
                                        @click="goToPages('https://cn.vuejs.org/')"
                                        class="icon"
                                        src="/vue.svg"
                                        alt="Vue"
                                        loading="lazy"
                                    >
                                    <img
                                        @click="goToPages('https://www.typescriptlang.org/zh/')"
                                        class="icon"
                                        src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                        alt="TypeScript"
                                        loading="lazy"
                                    >
                                    <img
                                        @click="goToPages('https://sass-lang.com/')"
                                        alt="SASS"
                                        src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
                                        class="icon"
                                        loading="lazy"
                                    >
                                    <img
                                        @click="goToPages('https://element-plus.org/')"
                                        alt="element-plus"
                                        src="../assets/icon/element-plus.svg"
                                        class="icon"
                                        loading="lazy"
                                    >
                                </div>
                                <div class="vue-bottom">
                                    基于Vue3.0+Vite2.0+TS4.0+Element-Plus的后台管理
                                    <p class="vuewebsite"><span>渐进式</span>JavaScript框架</p>
                                </div>
                            </div>
                        </div>
                        <router-view v-else />
                    </div>
                </el-main>
            </el-container>
            <el-footer class="footer">
                <HomeFooter />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
// 导入组件
import HomeAside from '../components/Home/HomeAside.vue';
import HomeHeader from '../components/Home/HomeHeader.vue';
import HomeFooter from '../components/Home/HomeFooter.vue';
// 导入Vue-Router
import { computed, watchEffect,ref } from 'vue';
// 导入Vue-Router
import { useRoute } from 'vue-router';

// 定义变量
const isOpenRouterView = ref(false);

// 假设 routes 的 meta 定义了面包屑的结构
const route = useRoute();

const breadcrumbList = computed(() => {
    const matchedRoutes = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    return matchedRoutes.map(item => ({
        path: item.path,
        name: item.meta.breadcrumb,
    }));
});

// 监听当前的路径是否/home
watchEffect(() => {
    if (route.path !== '/home') {
        isOpenRouterView.value = true;
    } else {
        isOpenRouterView.value = false;
    }
});

function goToPages(url: string) {
    window.open(url, '_blank');
}
</script>

<style scoped lang="scss">
@import '../styles/base.module.scss';
.home{
    width: 100dvw;
    height: 100dvh;
    .container{
        width: 100%;
        height: 100%;
        .header{
            background-color: $googleBlue;
        }
        .main{
            height: calc(100% - 120px);
            .aside{
                background-color: #ccc;
                width: 1.5rem;
            }
            .content{
                width: calc(100% - 1.5rem);
                .top{
                    height: .2rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .left{
                        width: 30%;
                        height: 100%;
                    }
                    .right{
                        width: 50%;
                        height: 55%;
                        background-color: orange;
                    }
                }
                .bottom{
                    width: 100%;
                    height: calc(100% - .2rem);
                    border-top: 1px solid #ccc;
                    .overflow{
                        width: 100%;
                        height: 100%;
                        background: url('/bg.webp') no-repeat center center/cover;
                        .box{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            background-color: rgba($color: #fff, $alpha: .7);
                            .vue-top {
                                    margin-bottom: .2rem;
                            
                                    .icon {
                                        width: .4rem;
                                        height: .4rem;
                                        margin-right: .1rem;
                                        cursor: pointer;
                            
                                        &:last-child {
                                            margin-right: 0;
                                        }
                                    }
                                }
                            
                                .vue-bottom {
                                    font-weight: bold;
                                    font-size: .15rem;
                                    color: #666;
                            
                                    .vuewebsite {
                                        font-size: .12rem;
                                        text-align: center;
                                        color: black;
                            
                                        span {
                                            -webkit-text-fill-color: transparent;
                                            background: -webkit-linear-gradient(315deg, rgb(66, 211, 146) 25%, rgb(100, 126, 255)) text;
                                        }
                                    }
                                }
                        }
                    }
                }
            }
        }
        .footer{
            background-color: #333;
        }
    }
}
</style>
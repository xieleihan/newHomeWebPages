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
                    <div class="bottom">
                        <router-view />
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
import { computed } from 'vue';
// 导入Vue-Router
import { useRoute } from 'vue-router';

// 假设 routes 的 meta 定义了面包屑的结构
const route = useRoute();

const breadcrumbList = computed(() => {
    const matchedRoutes = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    return matchedRoutes.map(item => ({
        path: item.path,
        name: item.meta.breadcrumb,
    }));
});
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
            .aside{
                background-color: #ccc;
                width: 1.5rem;
            }
            .content{
                width: calc(100% - 1.5rem);
                .top{
                    height: .2rem;
                    width: 100%;
                }
                .bottom{
                    width: 100%;
                    height: calc(100% - .2rem);
                    border-top: 1px solid #ccc;
                }
            }
        }
        .footer{
            background-color: #333;
        }
    }
}
</style>
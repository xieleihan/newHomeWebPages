<template>
    <div class="homeAside">
        <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            unique-opened="true"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </template>
                <el-menu-item-group title="状态">
                    <router-link to="/home/overview">
                        <el-menu-item index="1-1">
                            概览
                        </el-menu-item>
                    </router-link>
                    <router-link to="/home/systemlog">
                        <el-menu-item index="1-2">
                            系统日志
                        </el-menu-item>
                    </router-link>
                    <router-link to="/home/serverstatus">
                        <el-menu-item index="1-3">
                            服务器状态
                        </el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-menu-item-group title="系统">
                    <router-link to="/home/system">
                        <el-menu-item index="1-4">管理权</el-menu-item>
                    </router-link>
                    <router-link to="/home/systemAccess">
                        <el-menu-item index="1-5">访问情况</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>管理</span>
                </template>
                <el-menu-item-group title="模块">
                    <el-sub-menu index="2-1">
                        <template #title>用户管理</template>
                        <el-menu-item index="2-1-1">用户列表</el-menu-item>
                        <el-menu-item index="2-1-2">反馈查询</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2-2">
                        <template #title>轮播管理</template>
                        <el-menu-item index="2-2-1">轮播管理</el-menu-item>
                        <el-menu-item index="2-2-2">新增轮播</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2-3">
                        <template #title>图书管理</template>
                        <el-menu-item index="2-3-1">书库列表</el-menu-item>
                        <el-menu-item index="2-3-2">新增书库</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="2-4">
                        项目发布管理
                    </el-menu-item>
                    <el-sub-menu index="2-5">
                        <template #title>博客管理</template>
                        <el-menu-item index="2-5-1">文章列表</el-menu-item>
                        <el-menu-item index="2-5-2">发布文章</el-menu-item>
                        <el-menu-item index="2-5-3">趋势分析</el-menu-item>
                    </el-sub-menu>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <ElementPlus />
                    </el-icon>
                    <span>...</span>
                </template>
                <el-menu-item-group title="模块">

                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref,watchEffect } from 'vue';
// 导入Vue router
import { useRouter } from 'vue-router';

// 使用路由
const router = useRouter();

// 创建变量
const defaultActive = ref('1-1');

// 路由判断defaultActive
watchEffect(() => {
    const path = router.currentRoute.value.path;
    switch (path) {
        case '/home/overview':
            defaultActive.value = '1-1';
            break;
        case '/home/systemlog':
            defaultActive.value = '1-2';
            break;
        case '/home/serverstatus':
            defaultActive.value = '1-3';
            break;
        case '/home/system':
            defaultActive.value = '1-4';
            break;
        default:
            defaultActive.value = '1-1';
            break;
    }
});
</script>

<style scoped lang="scss">
.homeAside{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
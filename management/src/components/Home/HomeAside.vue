<template>
    <div class="homeAside">
        <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
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
                </el-menu-item-group>
                <el-menu-item-group title="系统">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
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
}
</style>
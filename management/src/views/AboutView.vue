<template>
    <div class="about">
        <el-container class="container">
            <el-header class="header">
                <HomeHeader />
            </el-header>
        <el-container class="main">

        </el-container>
            <el-footer class="footer">
                <HomeFooter />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import HomeHeader from '../components/Home/HomeHeader.vue';
import HomeFooter from '../components/Home/HomeFooter.vue';
</script>

<style scoped lang="scss">
@import '../styles/base.module.scss';

.about {
    width: 100dvw;
    height: 100dvh;

    .container {
        width: 100%;
        height: 100%;

        .header {
            background-color: $googleBlue;
        }

        .main {
            height: calc(100% - 120px);
        }

        .footer {
            background-color: #333;
        }
    }
}
</style>
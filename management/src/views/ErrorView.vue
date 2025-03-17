<template>
    <div class="error">
        <div class="container">
            <div class="topLeft">
                <img loading="lazy" src="../assets/icon/404.svg" alt="Error">
            </div>
            <div class="bottomRight">
                <p class="title">网络错误</p>
                <p class="desc">你来到无人问津的荒漠</p>
                <el-button type="primary">返回首页</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.error{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    .container{
        width: 60%;
        height: 60%;
        
    }
}
</style>
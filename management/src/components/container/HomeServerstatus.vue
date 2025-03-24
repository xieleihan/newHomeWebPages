<template>
    <div class="serverStatus">

    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, onUnmounted } from 'vue';
// 导入请求
import { getServerStatus } from '../../api/request';

onMounted(() => {
    getServerStatus({}).then(res => {
        console.log(res);
    });
})
</script>

<style scoped lang="scss">
.serverStatus{
    width: 100%;
    height: 100%;
    padding: .1rem;
}
</style>
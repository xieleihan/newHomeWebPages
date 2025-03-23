<template>
    <div class="systemLog" v-html="htmlStr">
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref } from 'vue';

// 创建变量
const htmlStr = ref('<div>Windows PowerShell</div><div>版权所有（C） Microsoft Corporation。保留所有权利。</div><div>安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows</div><div>PS C:/\Users/\Administration/npm run dev</div><br />');
</script>

<style scoped lang="scss">
.systemLog{
    width: 100%;
    height: 100%;
    background-color: #0d1117;
    color: #fff;
    padding: .1rem;
}
</style>
<template>
    <div class="system">
        <el-tabs type="border-card">
            <el-tab-pane label="发布版本动态">
                <ReleaseNote />
            </el-tab-pane>
            <el-tab-pane label="控制台">
                <SystemConfig />
            </el-tab-pane>
            <el-tab-pane label="系统资源">
                <SystemStaticread />
            </el-tab-pane>
            <el-tab-pane label="发布通知">
                <WebPush />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
// 导入组件
import ReleaseNote from '../Modules/ReleaseNote.vue';
import SystemConfig from '../Modules/SystemConfig.vue';
import SystemStaticread from '../Modules/SystemStaticread.vue';
import WebPush from '../Modules/WebPush.vue';
</script>

<style scoped lang="scss">
.system{
    width: 100%;
    height: 100%;
    padding: .1rem;
        overflow-y: scroll;
    
        // 隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }
}
</style>
<template>
    <div class="system">
        <el-tabs
            type="border-card"
            @tab-click="handleTabClick"
        >
            <el-tab-pane label="发布版本动态">
                <ReleaseNote />
            </el-tab-pane>
            <el-tab-pane label="控制台">
                <SystemConfig />
            </el-tab-pane>
            <el-tab-pane
                label="系统资源"
                name="SystemStaticread"
            >
                <SystemStaticread v-if="isOpenStaticread" ref="staticReadRef" />
            </el-tab-pane>
            <el-tab-pane label="发布通知">
                <WebPush v-if="isOpenWebPush" />
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

import { ref, nextTick } from 'vue';

const isOpenStaticread = ref(false);
const isOpenWebPush = ref(false);

const staticReadRef = ref<{ resizeChart: () => void } | null>(null);

const handleTabClick = (pane:any) => {
    if (pane.props.label === '系统资源') {
        isOpenStaticread.value = true;
        nextTick(() => {
            staticReadRef.value?.resizeChart();
        });
    } else {
        isOpenStaticread.value = false;
    }
    if (pane.props.label === '发布通知') {
        isOpenWebPush.value = true;
    } else {
        isOpenWebPush.value = false;
    }
};
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
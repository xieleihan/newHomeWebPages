<template>
    <div
        class="releaseNote"
        v-loading="commitList.length === 0"
    >
        <el-tabs type="border-card">
            <el-tab-pane label="提交历史">
                <div class="onePages">
                    <el-timeline style="max-width: 600px">
                        <el-timeline-item
                            v-for="(item, index) in commitList"
                            :key="index"
                            :timestamp="item.date"
                            placement="top"
                            :icon="item.icon"
                            :type="item.type"
                        >
                            <el-card>
                                <h4>{{ item.sha }}</h4>
                                <div
                                    style="display: flex;justify-content: space-between;align-items: center;margin: .1rem 0;">
                                    <div
                                        class="left"
                                        style="display: flex;align-items: center;"
                                    >
                                        <img
                                            style="border-radius: 50%;width: 30px;height: 30px;margin-right: .1rem;"
                                            loading="lazy"
                                            :src="item.author_avatar"
                                            alt="头像"
                                        >
                                        <p><el-tag type="info">{{ item.message }}</el-tag></p>
                                    </div>
                                    <div class="right">
                                        <el-button
                                            @click="handleDetail(item.url)"
                                            type="primary"
                                            size="small"
                                        >查看详情</el-button>
                                    </div>
                                </div>
                                <p>提交者:{{ item.author }}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <el-card style="width: calc(100% - 600px);">
                        
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="版本历史">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
// 导入请求
import { getCommitList } from '../../api/request';

interface CommitItem {
    sha: string;
    date: string;
    message: string;
    author_avatar: string;
    author: string;
    icon: string;
    type: string;
    url: string;
}

const commitList = ref<CommitItem[]>([]);
const goToUrl = ref('https://github.com');

onMounted(() => {
    getCommitList({}).then((res) => {
        let obj = JSON.parse(JSON.stringify(res)); // 避免响应式丢失
        if (obj.list.length > 0) {
            obj.list[0] = { ...obj.list[0], icon: 'Select', type: 'primary' };
        }
        commitList.value = obj.list;
    });
});

const handleDetail = (url: string) => {
    goToUrl.value = url;
};

</script>

<style scoped lang="scss">
.releaseNote{
    width: 100%;
    min-height: 1rem;
    .onePages{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>
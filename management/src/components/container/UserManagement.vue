<template>
    <div class="userManagement">
        <div class="top">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <div class="bottom">
            <el-table
                :data="tableArray"
                style="width: 100%"
                border
                stripe
                size="small"
                height="90%"
            >
            <el-table-column
                prop="username"
                label="用户名"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="useravater"
                label="用户头像"
                width="180"
                show-overflow-tooltip
                ></el-table-column>
            <el-table-column
                prop="userdesc"
                label="用户描述"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="uuid"
                label="用户ID"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="userip"
                label="访问IP"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="useraddress"
                label="用户地址"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="registerTime"
                label="注册时间"
                width="180"
                show-overflow-tooltip
            ></el-table-column>
        </el-table>
            <el-pagination
                size="small"
                background
                layout="prev, pager, next"
                :total="50"
                class="mt-4"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted } from 'vue';
// 导入请求
import { getUserList } from '../../api/request';

const tableArray = ref<any[]>([]); // 表格数组

onMounted(() => {
    getUserList({}).then((res) => {
        let str = JSON.stringify(res);
        let obj = JSON.parse(str);
        tableArray.value = obj.data;
    });
})
</script>

<style scoped lang="scss">
.userManagement{
    width: 100%;
    height: 100%;
    .top{
        width: 100%;
        height: .5rem;
    }
    .bottom{
        width: 100%;
        height: calc(100% - .5rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
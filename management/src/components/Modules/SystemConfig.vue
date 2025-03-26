<template>
    <div class="systemConfig">
        <el-tabs type="border-card">
            <el-tab-pane label="环境变量">
                <el-row>
                    <el-col>
                        <el-form>
                            <el-form-item
                                v-for="item in emvList"
                                :key="item.key"
                                :label="item.key"
                            >
                                <div style="display: flex;">
                                    <el-input
                                        v-if="item.value !== null"
                                        :disabled="!item.editable"
                                        v-model="item.value"
                                        placeholder="请输入内容"
                                    ></el-input>
                                    <el-button
                                        @click="changeInput(item)"
                                        v-if="item.value !== null"
                                        type="danger"
                                        style="margin-left: .1rem;"
                                    ><span v-if="!item.editable">修改</span><span
                                            v-if="item.editable">不修改</span></el-button>
                                    <el-button
                                        v-if="item.value !== null && item.editable"
                                        type="primary"
                                        style="margin-left: .1rem;"
                                    >
                                        提交
                                    </el-button>
                                    <el-input
                                        v-if="item.value === null"
                                        disabled
                                        v-model="item.value"
                                        placeholder="无权修改"
                                    ></el-input>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="服务操作">
                <el-row>
                    <el-col style="margin-bottom: .1rem;">
                        执行操作,请知悉,下面的操作有风险
                    </el-col>
                    <el-col style="margin-bottom: .1rem;">
                        <el-button @click="resetPower" type="primary">重启</el-button>
                    </el-col>
                    <el-col>
                        <el-button @click="powerOff" type="danger">关机</el-button>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getEmvList } from '../../api/request';
// 导入请求
import { sendReset,sendShutdown } from '../../api/request';
import { ElMessage } from 'element-plus';

const emvList = ref<any[]>([]);

onMounted(() => {
    getEmvList({}).then((res) => {
        let str = JSON.stringify(res);
        let obj = JSON.parse(str);
        // 对象转数组
        let arr = Object.keys(obj.data).map((key) => {
            return {
                key: key,
                value: obj.data[key],
                editable: false,
            }
        });
        emvList.value = arr;
    });
})

const changeInput = (item: any) => {
    item.editable = !item.editable;
};

const resetPower = () => {
    sendReset({}).then(() => {
        ElMessage(
            {
                message: "重启成功",
                type: 'success'
            }
        )
    });
};

const powerOff = () => {
    sendShutdown({}).then(() => {
        ElMessage(
            {
                message: "关机成功",
                type: 'success'
            }
        )
    });
};
</script>

<style scoped lang="scss">
.systemConfig{
    width: 100%;
}
</style>
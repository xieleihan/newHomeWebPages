<template>
    <div class="header">
        <div
            class="left"
            @click="$router.push('/home')"
        >
            <img
                class="logo"
                loading="lazy"
                src="../../assets/icon/peacock_flat.png"
                alt="logo"
            >
            <span class="title">南秋SouthAki的数通中台</span>
        </div>
        <div class="right">
            <div class="nowTimeBox">{{ nowTime }}</div>
            <div class="avaterBox">
                <el-dropdown class="dropdown">
                    <img
                        class="avater"
                        src="../../assets/icon/avater.jpg"
                        alt="avater"
                    >
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item @click="dialogVisible = true">修改密码</el-dropdown-item>
                            <el-dropdown-item><router-link to="/about">关于我们</router-link></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div
                class="powerBox"
                @click="logout"
            >
                <el-icon>
                    <SwitchButton />
                </el-icon>
                <span>退出系统</span>
            </div>
        </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="修改密码"
        width="500"
        :before-close="handleClose"
    >
        <!-- <span>是否确定修改密码</span> -->
        <el-form
            :model="form"
            :rules="rules"
            ref="ruleFormRef"
            :size="formSize"
            label-width="100px"
        >
            <el-form-item
                label="旧密码"
                prop="oldPassword"
            >
                <el-input
                    v-model="form.oldPassword"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item
                label="新密码"
                prop="newPassword"
            >
                <el-input
                    v-model="form.newPassword"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item
                label="确认密码"
                prop="confirmPassword"
            >
                <el-input
                    v-model="form.confirmPassword"
                    show-password
                ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="submit(); dialogVisible = false"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted, onUnmounted,reactive } from 'vue';
// 导入Vue-Router
import { useRouter } from 'vue-router';
import type { ComponentSize, FormInstance } from 'element-plus';
// 导入请求
import { changePassword } from '../../api/request';

// 获取路由
const router = useRouter();

interface FormRules {
    oldPassword: { required: boolean, message: string, trigger?: string }[],
    newPassword: { required: boolean, message: string, trigger?: string }[],
    confirmPassword: { required: boolean, message: string, trigger?: string }[]
}

// 创建变量
const nowTime = ref('');
const dialogVisible = ref(false)
const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
});
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' }
    ]
})

// 格式化时间（补零）
const padZero = (num: number) => String(num).padStart(2, '0');

// 创建方法
const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());
    const second = padZero(date.getSeconds());
    const week = date.getDay();
    const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
    nowTime.value = `${year}-${month}-${day} ${hour}:${minute}:${second} 星期${weekArr[week]}`;
}

let intervalId: ReturnType<typeof setInterval> | null = null;

// 生命周期钩子
onMounted(() => {
    getTime();
    intervalId = setInterval(getTime, 1000);
});

// 卸载生命周期
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

// 退出系统
const logout = () => {
    ElMessageBox.confirm('确定退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // 清除cookies
        document.cookie = 'AUTO_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // 跳转到起始页
        router.push('/start');
    }).catch(() => {
        ElMessage.info('已取消退出');
    });
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你确定要关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            form.oldPassword = '';
            form.newPassword = '';
            form.confirmPassword = '';
            done()
        })
        .catch(() => {
            // catch error
            ElMessage.info('已取消关闭');
        })
}

const submit = () => {
    ruleFormRef.value?.validate((valid) => {
        if (valid) {
            if (form.newPassword !== form.confirmPassword) {
                ElMessage.error("两次输入的新密码不一致！");
                return;
            }

            // 发送请求
            changePassword({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            }).then(() => {
                ElMessage.success("密码修改成功");
                form.oldPassword = '';
                form.newPassword = '';
                form.confirmPassword = '';
                // 清除浏览器cookie中关于AUTO_TOKEN的值
                document.cookie = `AUTO_TOKEN =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path =/;`;
                // 跳转到登录页
                router.push('/start');
                dialogVisible.value = false;
            }).catch((err) => {
                ElMessage.error(err.message || "修改失败");
            });
        }
    });
};
</script>

<style scoped lang="scss">
.header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 .3rem;
    color: white;
    .left,
    .right{
        height: 100%;
        display: flex;
        align-items: center;
    }

    .left{
        cursor: pointer;
        .logo{
            height: 60%;
            aspect-ratio: 1/1;
        }
        .title{
            font-size: .15rem;
            margin-left: .1rem;
        }
    }
    .right{
        .nowTimeBox,
        .avaterBox,
        .powerBox{
            height: 100%;
            display: flex;
            align-items: center;
            margin-left: .1rem;
            font-size: .1rem;
            cursor: default;
        }

        .powerBox{
            cursor: pointer;
        }

        .avaterBox{
            .dropdown{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }
            .avater{
                height: 50%;
                aspect-ratio: 1/1;
                border-radius: 50%;
                border: 1px solid white;
            }
        }
    }
}
</style>
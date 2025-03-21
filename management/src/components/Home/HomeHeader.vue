<template>
    <div class="header">
        <div class="left">
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
                            <el-dropdown-item>修改密码</el-dropdown-item>
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
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted, onUnmounted } from 'vue';
// 导入Vue-Router
import { useRouter } from 'vue-router';
// 获取路由
const router = useRouter();

// 创建变量
const nowTime = ref('');

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
    nowTime.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
        // 跳转到起始页
        router.push('/start');
    }).catch(() => {
        ElMessage.info('已取消退出');
    });
}
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
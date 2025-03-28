<template>
    <div class="start">
        <div class="container">
            <div class="left">
                <div
                    class="leftBox"
                    v-if="$route.path === '/start'"
                >
                    <img
                        class="logo"
                        loading="lazy"
                        src="../assets/icon/peacock_flat.png"
                        alt="logo"
                    >
                    <p class="title">数通中台</p>
                </div>
                <router-view v-else></router-view>
            </div>
            <div class="right">
                <p class="title">入网登录</p>
                <el-form
                    class="form"
                    :rules="rules"
                    ref="rulesFormRef"
                    :model="form"
                >
                    <el-form-item
                        class="formItem"
                        label="用户名"
                        prop="username"
                    >
                        <el-input
                            v-model="form.username"
                            placeholder="请输入用户名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        class="formItem"
                        label="密 码"
                        prop="password"
                    >
                        <el-input
                            v-model="form.password"
                            placeholder="请输入密码"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        class="formItem"
                        label="图片验证码"
                        prop="captcha"
                    >
                        <el-row>
                            <el-col :span="12">
                                <el-input
                                    v-model="form.captcha"
                                    placeholder="请输入图片验证码"
                                    maxlength="6"
                                ></el-input>
                            </el-col>
                            <el-col :span="12">
                                <div
                                    class="svgBox"
                                    v-html=svgHtml
                                ></div>
                            </el-col>
                            <el-col
                                class="col"
                                :span="24"
                            >
                                <div
                                    class="colBox"
                                    @click="refresh()"
                                >
                                    <el-icon>
                                        <Refresh />
                                    </el-icon>
                                    <span>看不清,刷新一下</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item class="formItem">
                        <el-checkbox v-model="form.accept">同意<router-link
                                to="/start/userAgreement"
                                class="goToLink"
                            >《用户协议》</router-link>与<router-link
                                to="/start/privacyPolicy"
                                class="goToLink"
                            >《隐私政策》</router-link></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="submit"
                            type="primary"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onUnmounted, onMounted, reactive } from 'vue';
// 导入路由
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
// 导入请求
import { getImgVerify,login } from '../api/request';

// 创建变量
const form = ref({
    username: '',
    password: '',
    captcha: '',
    accept: false
});
const svgHtml = ref('');
const rulesFormRef = ref<FormInstance>()
interface RuleForm {
    username: string;
    password: string;
    captcha: string;
    accept: boolean;
}
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入图片验证码', trigger: 'blur' }
    ]
});
const router = useRouter();

function getSvgImg() {
    getImgVerify({}).then(res => {
        let str = JSON.stringify(res);
        let obj = JSON.parse(str);
        sessionStorage.setItem('captchaKey', obj.key);
        return svgHtml.value = res.data;
    }).catch(() => {
        ElMessage.error('获取验证码失败');
    });
}

// 创建生命周期
onMounted(() => {
    getSvgImg();
});

// 卸载生命周期
onUnmounted(() => {
    // 重置表单
    form.value = {
        username: '',
        password: '',
        captcha: '',
        accept: false
    }
});

/**
 * 刷新验证码
 */
function refresh() {
    ElMessage.success('刷新验证码成功');
    getSvgImg();
}

async function submit() {
    if (!rulesFormRef.value) return;

    if(form.value.accept === false){
        ElMessage.error('请先同意用户协议和隐私政策');
        return;
    }

    await rulesFormRef.value.validate((valid) => {
        if (valid) {
            login({
                username: form.value.username,
                userpassword: form.value.password,
                code: form.value.captcha,
                key: sessionStorage.getItem('captchaKey')
            }).then(res => {
                let str = JSON.stringify(res);
                let obj = JSON.parse(str);
                if (obj.code === 200) {
                    ElMessage.success('登录成功');
                    // 设置有效期为半天
                    document.cookie = `AUTO_TOKEN=${obj.token};path=/;expires=${new Date(Date.now() + 43200000).toUTCString()}`;
                    router.push({ path: '/home' })
                } else {
                    getSvgImg();
                    ElMessage.error(obj.msg);
                }
            })
        } else {
            getSvgImg();
            ElMessage.error('请填写完整信息');
        }
    });
}
</script>

<style scoped lang="scss">
@import '../styles/base.module.scss';

.start {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/bg.webp) no-repeat center center/cover;

    .container {
        width: 60%;
        height: 60%;
        background-color: rgba($color: #fff, $alpha: .7);
        border-radius: $radius;
        padding: .2rem;
        display: flex;

        .left {
            height: 100%;
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #000;
            .leftBox{
                width: 100%;
                height: 100%;
                display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                .logo {
                    width: 40%;
                    aspect-ratio: 1/1;
                }
    
                .title {
                    margin-top: .2rem;
                    font-size: .2rem;
                }
            }

        }

        .right {
            width: 50%;
            height: 100%;
            padding: .2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .title{
                font-size: .2rem;
                margin-bottom: .1rem;
            }

            .form {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .formItem{
                    width: 100%;
                    .goToLink{
                        color: $googleBlue;
                        cursor: pointer;
                    }
                }

                .svgBox {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    ::v-deep(svg) {
                        height: 32px;
                        width: 100%;
                    }
                }
                .col{
                    display: flex;
                    align-items: center;
                    .colBox{
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>
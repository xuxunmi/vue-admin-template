<template>
    <div class="login-page relative h-screen">
        <div class="login-wrap">
            <el-form
                class="login-form"
                :model="loginForm"
                ref="loginForm"
                :rules="rules"
                :hide-required-asterisk="true"
                autocomplete="off"
                :status-icon="true"
            >
                <div class="login-title">
                    <h1>Vue2-admin</h1>
                </div>
                <el-form-item prop="username">
                    <!-- 自动获取焦点： :autofocus="true" -->
                    <el-input size="small" v-model.trim="loginForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        size="small"
                        type="password"
                        v-model.trim="loginForm.password"
                        placeholder="密码"
                        autocomplete="new-password"
                        show-password
                        @keyup.enter.native="handleLoginBtn"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="login-btn" @click="handleLoginBtn">
                        {{ loading ? '登录中...' : '登录' }}
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { set as setStorage, get as getStorage } from '@/utils/storage.js';
import { mapMutations, mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        // 自定义校验
        // const validateUsername = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error('请输入用户名'));
        //     } else {
        //         callback();
        //     }
        // };
        // const validatePassword = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error('请输入用户密码'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            loading: false,
            loginForm: {
                // 用户名
                username: 'admin',
                // 用户密码
                password: '123456'
            },
            rules: {
                // username: [{ validator: validateUsername, trigger: 'blur' }],
                // password: [{ validator: validatePassword, trigger: 'blur' }]
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        ...mapMutations(['SET_TAGS']),
        ...mapMutations('permission', ['SET_PERMISSIONS_BTN_LIST']),
        ...mapActions('user', ['setToken']),
        handleLoginBtn() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true;
                    // mockjs使用
                    let result = await axios.post('/api/login');
                    try {
                        let { code, token, msg } = result.data;
                        if (code === 200) {
                            // console.log('process.env: ', process.env);
                            // 设置token
                            setStorage('token', token, true);
                            console.log('getStorage: ', getStorage('token', true));
                            // 设置按钮权限
                            // this.SET_PERMISSIONS_BTN_LIST(data.loginUser.authKey);

                            // 设置登录默认为中文
                            this.$i18n.locale = 'zh_CN';
                            setStorage('lang', 'zh_CN', false);

                            this.setToken(token);
                            // 设置tagsList
                            this.SET_TAGS({
                                name: 'home',
                                title: '首页',
                                path: '/home'
                            });
                            this.$message({
                                type: 'success',
                                message: msg,
                                center: true
                            });
                            this.$router.push({ path: '/' });
                        }
                    } finally {
                        this.loading = false;
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-page {
    background: url('~@/assets/images/login/login_bg.png') no-repeat;
    background-size: cover;
    .login-wrap {
        position: absolute;
        top: 50%;
        right: 12%;
        width: 350px;
        height: 320px;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
        margin-top: -160px;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 350px;
            height: 320px;
            transform-origin: bottom right;
            background: linear-gradient(0deg, transparent, #ff1b69, #ff1b69);
            animation: animate 6s linear infinite;
            z-index: 1;
        }
        &::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 350px;
            height: 320px;
            transform-origin: bottom right;
            background: linear-gradient(0deg, transparent, #ff1b69, #ff1b69);
            animation: animate 6s linear infinite;
            animation-delay: -3s;
            z-index: 1;
        }
        @keyframes animate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .login-form {
            position: absolute;
            padding: 30px 20px;
            // 线性渐变
            background: linear-gradient(red 0%, orange 10%, orange 30%, yellow 50%, yellow 70%, green 90%, green 100%),
                linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%),
                linear-gradient(red 0%, orange 10% 30%, yellow 50% 70%, green 90% 100%);
            border-radius: 10px;
            inset: 2px;
            z-index: 2;
            .login-title {
                margin-bottom: 20px;
                letter-spacing: 3px;
            }
            .el-input {
                width: 100%;
                height: 42px;
                // background-color: transparent;
            }
            .login-btn {
                width: 200px;
                margin: 20px auto 0;
                line-height: 36px;
                background: #2e82ff;
                color: #ffffff;
                font-size: 18px;
                border-radius: 18px;
                animation: zoomLoginBtn 1.5s infinite;
                text-align: center;
                cursor: pointer;
            }
            @keyframes zoomLoginBtn {
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
        }
    }
}
</style>

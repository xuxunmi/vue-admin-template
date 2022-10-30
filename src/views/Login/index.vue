<template>
    <div class="login-page">
        <div class="login-wrap">
            <div class="login-title">
                <h1>Vue2-admin</h1>
            </div>
            <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="rules" :hide-required-asterisk='true'>
                <el-form-item prop="username">
                    <!-- 自动获取焦点： :autofocus="true" -->
                    <el-input size="small" v-model="loginForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        size="small"
                        type="password"
                        v-model="loginForm.password"
                        placeholder="密码"
                        autocomplete="new-password"
                        show-password
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
                username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password:[{ required: true, message: '请输入用户密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        ...mapMutations(['SET_TAGS']),
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
                            // 设置sessionStorage
                            setStorage('token', token, true);
                            console.log('getStorage: ', getStorage('token', true));
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
    position: relative;
    height: 100vh;
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
        transform: translateY(-50%);
        &::before {
            content: '';
            display: table;
        }
        .login-title {
            padding-top: 30px;
            img {
                width: 50px;
                height: 50px;
                vertical-align: middle;
            }
            span {
                position: relative;
                top: 7px;
                left: 10px;
                font-size: 24px;
            }
        }
        .login-form {
            width: 240px;
            margin: 30px auto 0;
            .el-input {
                height: 42px;
                // background-color: transparent;
            }
            .login-btn {
                width: 200px;
                height: 42px;
                margin: 0 auto;
                line-height: 42px;
                background: #2e82ff;
                color: #ffffff;
                font-size: 18px;
                border-radius: 27px;
                animation: zoomIn 1.5s infinite;
                text-align: center;
                cursor: pointer;
            }
            @keyframes zoomIn {
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

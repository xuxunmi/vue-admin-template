<template>
    <div class="login-page">
        <div class="login-wrap">
            <div class="login-title">
                <h1>Vue2-admin</h1>
            </div>
            <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" :autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="密码"
                        autocomplete="new-password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <div
                        class="login-btn"
                        v-loading="loading"
                        element-loading-spinner="el-icon-loading"
                        @click="handleLoginBtn"
                    >
                        登录
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户密码'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            loginForm: {
                // 用户名
                username: '',
                // 用户密码
                password: ''
            },
            rules: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            }
        };
    },
    methods: {
        handleLoginBtn() {
            console.log('登录按钮...');
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$router.push({ path: '/home' });
                } else {
                    console.log('error submit!!');
                    return false;
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
        height: 300px;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
        transform: translateY(-50%);
        &::before {
            content: '';
            display: table;
        }
        .login-title {
            margin-top: 30px;
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
<template>
    <div class="forget-password-page">
        <div class="forget-wrap">
            <div class="forget-title">
                <div>忘记密码</div>
            </div>
            <el-form class="forget-form" :model="forgerForm" ref="forgerForm" :rules="rules">
                <el-form-item label="请输入手机号：" prop="phone">
                    <el-input v-model="forgerForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="请输入验证码：" prop="code">
                    <el-input
                        style="position: relative"
                        v-model="forgerForm.code"
                        @blur="codeBlur"
                        :autofocus="true"
                    ></el-input>
                    <el-button
                        style="position: absolute; top: 40px; right: 15px"
                        type="text"
                        @click="sendVcodeHandle"
                        :disabled="!(timeWaitLeft <= 0)"
                        >{{ getCodeButtonText }}</el-button
                    >
                    <div class="error-tips">{{ errorTips }}</div>
                </el-form-item>
                <el-form-item label="请输入新密码：" prop="password">
                    <el-input type="password" v-model="forgerForm.password" autocomplete="new-password" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item><el-button type="text" @click="jumpLogin">去登录</el-button></el-form-item>
                <el-form-item>
                    <div
                        class="confirm-modify-btn"
                        v-loading="loading"
                        element-loading-spinner="el-icon-loading"
                        @click="handleConfirmModifyBtn"
                    >
                        确定修改
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgetPasswordPage',
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('手机号不能为空'));
            } else {
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error('验证码不能为空'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('新密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            forgerForm: {
                // 手机号
                phone: '',
                // 验证码
                code: '',
                // 新密码
                password: ''
            },
            rules: {
                phone: [{ validator: validatePhone, trigger: 'blur' }],
                code: [{ validator: validateCode, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            },
            timeWaitLeft: 0,
            timer: 0,
            errorTips: '',
            getCodeButtonText: '获取验证码',
            errorMessageDict: {
                formatCode: '验证码有误，请重新输入',
                emptyVode: '请输入验证码'
            }
        };
    },
    methods: {
        // 处理确认修改按钮
        handleConfirmModifyBtn() {
            console.log('确认修改按钮...');
            this.$refs.forgerForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                        center: true
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sendVcodeHandle() {
            // let mobile = this.mobile;
            // getMobileVcode({
            //     mobile: mobile
            // }).then(() => {
            this.timeWaitLeft = 60;
            this.sendedValid = true;
            this.countdown();
            // });
        },
        countdown() {
            this.getCodeButtonText = this.timeWaitLeft + '秒后重新获取';
            this.timer = setTimeout(() => {
                if (this.timeWaitLeft == 1) {
                    clearTimeout(this.timer);
                    this.getCodeButtonText = '获取验证码';
                    this.timeWaitLeft--;
                    return;
                }
                this.timeWaitLeft--;
                this.countdown();
            }, 1000);
        },
        // 校验验证码
        codeBlur() {
            if (this.forgerForm.code.length != 6) {
                this.errorTips = '请输入6位数字的验证码';
                return;
            }
        },
        // 处理去登录按钮
        jumpLogin() {
            this.$router.push({ path: '/login' });
        }
    }
};
</script>

<style lang="scss" scoped>
.forget-password-page {
    position: relative;
    height: 100vh;
    background: url('~@/assets/images/login/login_bg.png') no-repeat;
    background-size: cover;
    .forget-wrap {
        position: absolute;
        top: 50%;
        right: 12%;
        width: 440px;
        height: 500px;
        background-color: #fff;
        // text-align: center;
        border-radius: 10px;
        transform: translateY(-50%);
        &::before {
            content: '';
            display: table;
        }
        .forget-title {
            margin: 30px 0 0 30px;
            div {
                font-size: 22px;
            }
            img {
                width: 50px;
                height: 50px;
                vertical-align: middle;
            }
        }
        .forget-form {
            width: 380px;
            margin: 20px auto 0;
            .el-input {
                height: 42px;
                // background-color: transparent;
            }
            .el-form-item:nth-child(3),
            .el-form-item:nth-child(4) {
                margin-bottom: 0;
            }
            .el-form-item:nth-child(4) {
                width: 75px;
                margin: 10px 0;
            }
            .error-tips {
                margin-top: 2px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                color: #ff6d56;
            }
            .confirm-modify-btn {
                width: 380px;
                height: 42px;
                margin: 0 auto;
                line-height: 42px;
                background: #2e82ff;
                color: #ffffff;
                font-size: 18px;
                border-radius: 5px;
                // animation: zoomIn 1.5s infinite;
                text-align: center;
                cursor: pointer;
            }
            // @keyframes zoomIn {
            //     50% {
            //         transform: scale(1.1);
            //     }
            //     100% {
            //         transform: scale(1);
            //     }
            // }
        }
    }
}
</style>
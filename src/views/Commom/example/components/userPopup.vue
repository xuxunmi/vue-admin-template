<template>
    <div class="user-popup-page">
        <div class="card-header">基本信息</div>
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="96px">
            <el-form-item label="账号：" prop="account">
                <el-input
                    style="width: 100%;"
                    size="small"
                    clearable
                    v-model="userForm.account"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" v-if="type == 'add'">
                <el-input
                    style="width: 100%;"
                    size="mini"
                    type="password"
                    clearable
                    autocomplete="new-password"
                    v-model="userForm.password"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="重复密码：" prop="rePassword" v-if="type == 'add'">
                <el-input
                    style="width: 100%;"
                    size="mini"
                    type="password"
                    clearable
                    autocomplete="new-password"
                    v-model="userForm.rePassword"
                    placeholder="请再次输入重复密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="realName">
                <el-input
                    style="width: 100%;"
                    size="small"
                    clearable
                    v-model="userForm.realName"
                    placeholder="请输入姓名"
                ></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
                <el-input
                    style="width: 100%;"
                    size="small"
                    clearable
                    v-model="userForm.phone"
                    placeholder="请输入手机"
                ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input
                    style="width: 100%;"
                    size="small"
                    clearable
                    v-model="userForm.email"
                    placeholder="请输入邮箱"
                ></el-input>
            </el-form-item>
            <div class="btn-wrapper">
                <el-button size="mini" type="primary" @click="submitForm('userForm')">提交</el-button>
                <el-button size="mini" @click="$emit('update:show', false)">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { userManageAdd, userManageEdit } from '@/api/systemManage/userManage/index.js';
export default {
    name: 'userPopup',
    props: {
        type: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        const validatPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userForm.password !== '') {
                    this.$refs.userForm.validateField('rePassword');
                }
                callback();
            }
        };
        const validateRePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                account: '', // 账号
                password: '', // 密码
                rePassword: '', // 重复密码
                realName: '', // 姓名
                phone: '', // 手机
                email: '' // 邮箱
            },
            rules: {
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [
                    { required: true, validator: validatPassword, trigger: 'blur' }
                    // {
                    //     pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{10,}$/,
                    //     message: '请输入10位以上字符，至少包含数字、大小写字母、特殊字符中的三种类型',
                    //     trigger: 'blur'
                    // }
                ],
                rePassword: [{ required: true, validator: validateRePassword, trigger: 'blur' }],
                realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                phone: [
                    { required: true, message: '请输入手机', trigger: 'blur' },
                    {
                        pattern: /^1[3456789][0-9]{9}$/,
                        message: '手机号格式不正确',
                        trigger: 'blur'
                    }
                ],
                email: [
                    { message: '请输入邮箱', trigger: 'blur' },
                    {
                        pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    watch: {
        data: {
            handler(val) {
                if (!val) return;
                this.userForm = val;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let addParams = {
                        account: this.userForm.account,
                        password: this.userForm.password,
                        rePassword: this.userForm.rePassword,
                        realName: this.userForm.realName,
                        phone: this.userForm.phone,
                        email: this.userForm.email
                    };
                    let editParams = {
                        ...addParams,
                        userId: this.userForm.userId
                    };
                    let params = this.type == 'add' ? addParams : editParams;
                    let submitFun = this.type == 'add' ? userManageAdd : userManageEdit;
                    submitFun(params)
                        .then(res => {
                            let { code, message } = res;
                            if (code == '200') {
                                this.$emit('refreshTable', false, 'user');
                                this.$message({
                                    type: 'success',
                                    message,
                                    center: true
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.user-popup-page {
    .card-header {
        margin-bottom: 10px;
        line-height: 42px;
        border-bottom: 1px solid #f6f6f6;
        font-size: 16px;
    }
    .btn-wrapper {
        margin-top: 30px;
        text-align: center;
    }
}
</style>

<template>
    <div class="authorize-popup-page">
        <el-form :model="authorizeForm" :rules="rules" ref="authorizeForm" label-width="96px">
            <el-form-item label="选择角色：" prop="grantRoleIdList">
                <el-select
                    style="width: 100%;"
                    size="small"
                    v-model="authorizeForm.grantRoleIdList"
                    multiple
                    clearable
                    placeholder="请选择"
                >
                    <el-option v-for="item in grantRoleList" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="btn-wrapper">
                <el-button size="mini" type="primary" @click="submitForm('authorizeForm')">提交</el-button>
                <el-button size="mini" @click="$emit('update:show', false)">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { userManageGrantRole } from '@/api/systemManage/userManage/index.js';
export default {
    name: 'authorizePopup',
    props: {
        grantRoleList: {
            type: Array,
            default: () => []
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            authorizeForm: {
                grantRoleIdList: []
            },
            rules: {
                grantRoleIdList: [{ required: true, message: '请选择活动区域', trigger: 'blur' }]
            }
        };
    },
    watch: {
        data: {
            handler(val) {
                if (!val) return;
                this.authorizeForm = Object.assign({}, val);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        grantRoleIdList: this.authorizeForm.grantRoleIdList,
                        userId: this.authorizeForm.userId
                    };
                    userManageGrantRole(params)
                        .then(res => {
                            let { code, message } = res;
                            if (code == '200') {
                                this.$emit('refreshTable', false, 'authorize');
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
.authorize-popup-page {
    .btn-wrapper {
        margin-top: 30px;
        text-align: center;
    }
}
</style>

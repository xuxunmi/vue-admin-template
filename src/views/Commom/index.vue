<template>
    <div class="select-page" :class="tagsList.length === 0 ? 'mt-0' : 'mt-30'" v-loading="selectLoading">
        <el-form :inline="true" :model="selectFormData" ref="selectFormData" :rules="rules" class="select-rule-form">
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('status')"
                    >新增状态类型</el-button
                >
                <template v-if="selectFormData.statusData && selectFormData.statusData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.statusData"
                        :key="`statusData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'statusData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'statusData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('status', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
        </el-form>
        <el-button class="common-btn" size="small" type="primary" @click="handleConfirm">保存</el-button>
    </div>
</template>

<script>
import { getSelectContent, selectContentSave } from '@/api/basicData/select.js';
export default {
    name: 'selectEdit',
    data() {
        return {
            selectLoading: false,
            statusList: [
                {
                    id: 1,
                    name: '启用'
                },
                {
                    id: 0,
                    name: '停用'
                }
            ],
            selectFormData: {
                // 状态类型
                statusData: [
                    {
                        code: '',
                        name: ''
                    }
                ]
            },
            rules: {
                'commonRules.code': [
                    {
                        required: true,
                        message: '请输入下拉选code！',
                        trigger: 'blur'
                    }
                ],
                'commonRules.name': [
                    {
                        required: true,
                        message: '请输入下拉选name！',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {
        tagsList() {
            return this.$store.state.tagsList;
        }
    },
    created() {
        this.querySelectFormData();
    },
    methods: {
        // 获取状态name
        statusName(row) {
            return this.statusList.find(val => val.id === row.status)?.name;
        },
        // 查数组对象的下标
        getIndex() {
            let index = this.statusList.findIndex(val => val.name === '启用');
            return index;
        },
        querySelectFormData() {
            this.selectLoading = true;
            getSelectContent()
                .then(res => {
                    let { code, data } = res;
                    if (code == '200') {
                        const {
                            // 状态类型
                            status: statusData
                        } = data;
                        this.selectFormData = {
                            statusData
                        };
                    }
                })
                // 不管结果如何，都会执行
                .finally(() => {
                    this.selectLoading = false;
                });
        },
        // 处理新增下拉选
        handleAddSelect(type) {
            switch (type) {
                case 'status':
                    this.selectFormData.statusData.push({
                        code: '',
                        name: ''
                    });
                    break;
                default:
                    '';
            }
        },
        // 处理删除下拉选
        handleDeleteSelect(type, index) {
            switch (type) {
                case 'status':
                    this.selectFormData.statusData.splice(index, 1);
                    break;
                default:
                    '';
            }
        },
        // 处理保存按钮
        handleConfirm() {
            this.$refs.selectFormData.validate(valid => {
                if (valid) {
                    const { statusData: status } = this.selectFormData;
                    const params = {
                        status
                    };
                    selectContentSave(params)
                        .then(res => {
                            let { code, message } = res;
                            if (code == '200') {
                                this.$message({
                                    message: message,
                                    type: 'success',
                                    center: true
                                });
                            }
                        })
                        .finally(() => {
                            this.querySelectFormData();
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.mt-0 {
    margin-top: 0px !important;
}
.mt-30 {
    margin-top: 30px !important;
}
.select-page {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    .el-form {
        .el-input {
            width: 240px;
        }
    }
    .common-wrapper {
        margin-bottom: 20px;
        .common-btn {
            margin-bottom: 10px;
        }
        .common-items {
            ::v-deep .el-form-item__label::before {
                content: '';
            }
            .del-btn {
                position: relative;
                top: 7px;
                margin-bottom: 22px;
            }
        }
        .no-data {
            line-height: 50px;
            text-align: center;
            border: 1px solid #d8d8d8;
            margin-bottom: 20px;
        }
    }
}
</style>

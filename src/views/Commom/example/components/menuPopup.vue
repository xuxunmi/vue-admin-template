<template>
    <div class="menu-popup-page">
        <div class="menu-tree" v-loading="loading">
            <el-tree
                ref="tree"
                :data="meunTreeData"
                show-checkbox
                node-key="id"
                highlight-current
                :props="defaultProps"
                @check-change="handleCheckChange"
            >
            </el-tree>
        </div>
        <div class="btn-wrapper">
            <el-button size="mini" type="primary" @click="submitForm('roleForm')">提交</el-button>
            <el-button size="mini" @click="$emit('update:show', false)">取消</el-button>
        </div>
    </div>
</template>

<script>
import { menuTreeList, menuTreeSave } from '@/api/systemManage/roleManage/index.js';

export default {
    name: 'menuPopup',
    props: {
        roleId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            meunTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            // 树选中的节点ids
            meunTreeSelectionIds: []
        };
    },
    created() {
        this.queryMenuTreeData();
    },
    methods: {
        /**
         *  递归获取tree所有节点id
         * @param {treeList} Array
         */
        getAllNodeId(treeList, expandedIds = []) {
            if (treeList.length === 0) return;
            treeList.forEach(item => {
                if (item.checked === true) {
                    expandedIds.push(item.id);
                }
                if (item.children && item.children.length > 0) {
                    expandedIds = this.getAllNodeId(item.children, expandedIds);
                }
            });
            return expandedIds;
        },
        // 查询菜单权限树列表
        async queryMenuTreeData() {
            this.loading = true;
            let params = {
                roleId: this.roleId,
                appCode: 'sfCost'
            };
            try {
                let { code, data } = await menuTreeList(params);
                if (code == '200') {
                    this.meunTreeData = data;
                    // 递归遍历后端返回的数据，checked为true表示勾选
                    if (data && data.length > 0) {
                        // 回显数据id
                        let checkedMenuIds = this.getAllNodeId(data);
                        checkedMenuIds.forEach(val => {
                            this.$nextTick(() => {
                                // 解决element-ui的el-tree组件半选中回显的问题
                                this.$refs.tree.setChecked(val, true, false);
                            });
                        });
                    }
                    this.loading = false;
                }
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        handleCheckChange() {
            let treeSelectionList = this.$refs.tree.getCheckedNodes();
            this.meunTreeSelectionIds = treeSelectionList.map(val => val.id);
        },
        submitForm() {
            let params = {
                grantMenuIdList: this.meunTreeSelectionIds,
                roleId: this.roleId
            };
            menuTreeSave(params)
                .then(res => {
                    let { code, message } = res;
                    if (code == '200') {
                        this.$emit('refreshTable', false, 'menu');
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
    }
};
</script>

<style lang="scss" scoped>
.menu-popup-page {
    .btn-wrapper {
        margin-top: 30px;
        text-align: center;
    }
}
</style>

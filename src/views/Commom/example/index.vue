<template>
    <div class="user-manage-page h-full w-full px-4 box-border overflow-hidden" :class="{ 'pt-14': tagsList.length }">
        <el-form style="width: 100%" :inline="true" :model="searchForm" ref="searchForm">
            <el-form-item>
                <el-input size="mini" v-model.trim="searchForm.account" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input size="mini" v-model.trim="searchForm.name" clearable placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" plain @click="handleSearchBtn">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" plain @click="handleAddAndModifyBtn('add')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" header-align="center">
            <el-table-column type="index" label="序号" width="60" :index="indexMethod" align="center">
            </el-table-column>
            <el-table-column prop="account" label="账号" align="center"> </el-table-column>
            <el-table-column prop="realName" label="姓名" align="center"> </el-table-column>
            <el-table-column prop="phone" label="手机" align="center"> </el-table-column>
            <el-table-column prop="statusFlag" label="状态" align="center">
                <template v-slot="scope">
                    <el-switch
                        v-model="scope.row.statusFlag"
                        :active-value="1"
                        inactive-value="2"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="启用"
                        inactive-text="停用"
                        @change="handleStausFlagChange(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="360" align="center">
                <template v-slot="scope">
                    <el-button type="primary" size="mini" plain @click="handleAddAndModifyBtn('edit', scope.row)"
                        >修改</el-button
                    >
                    <el-button type="danger" size="mini" plain @click="handleDeleteBtn(scope.row)">删除</el-button>
                    <el-dropdown trigger="click" style="margin-left: 10px">
                        <el-button size="mini" type="primary">
                            更多 <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.native="handleDistributeBtn(scope.row)"
                                    >分配角色</el-dropdown-item
                                >
                                <el-dropdown-item @click.native="handleResetPwdBtn(scope.row)"
                                    >重置密码</el-dropdown-item
                                >
                                <el-dropdown-item @click.native="handleDistributionMenuBtn(scope.row)"
                                    >分配菜单</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 20px; text-align: right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.page"
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="page.total"
        >
        </el-pagination>

        <!-- 添加/修改用户弹窗 -->
        <dialog-frame
            :title="type == 'add' ? '添加用户' : '修改用户'"
            :show.sync="dialogVisible.user"
            width="40%"
            :footer="false"
        >
            <user-popup
                v-if="dialogVisible.user"
                :show.sync="dialogVisible.user"
                :type="type"
                :data="editForm"
                @refreshTable="handleRefreshTable(arguments)"
            ></user-popup>
        </dialog-frame>

        <!-- 授权角色弹窗 -->
        <dialog-frame :title="'授权角色'" :show.sync="dialogVisible.authorize" width="40%" :footer="false">
            <authorize-popup
                v-if="dialogVisible.authorize"
                :show.sync="dialogVisible.authorize"
                :grant-role-list="grantRoleList"
                :data="editForm"
                @refreshTable="handleRefreshTable(arguments)"
            ></authorize-popup>
        </dialog-frame>

        <!-- 修改分配菜单权限弹窗 -->
        <dialog-frame :title="'分配菜单权限'" :show.sync="dialogVisible.menu" width="40%" :footer="false">
            <menu-popup
                v-if="dialogVisible.menu"
                :show.sync="dialogVisible.menu"
                :role-id="roleId"
                @refreshTable="handleRefreshTable(arguments)"
            ></menu-popup>
        </dialog-frame>
    </div>
</template>

<script>
import dialogFrame from '@/components/dialogFrame/index.vue';
import userPopup from './components/userPopup.vue';
import authorizePopup from './components/authorizePopup.vue';
import menuPopup from './components/menuPopup.vue';
import {
    getUserManageList,
    getSysRoleList,
    userManageChangeStatus,
    userManageDelete,
    userManageResetPwd
} from '@/api/systemManage/userManage/index.js';
export default {
    name: 'userManage',
    components: { dialogFrame, userPopup, authorizePopup, menuPopup },
    data() {
        return {
            loading: false,
            page: {
                page: 1,
                pageSize: 50,
                total: 0
            },
            searchForm: {
                account: undefined,
                name: undefined
            },
            tableData: [],
            grantRoleList: [], // 角色列表
            type: '',
            dialogVisible: {
                user: false, // 是否显示新增/编辑弹窗
                authorize: false, // 是否显示授权角色弹窗
                menu: false // 是否分配菜单按钮弹窗
            },
            editForm: {} // 编辑用户/授权角色信息
        };
    },
    computed: {
        tagsList() {
            return this.$store.state.tagsList;
        }
    },
    created() {
        this.mainInit();
    },
    methods: {
        // 刷新table
        handleRefreshTable(data) {
            this.dialogVisible[data[1]] = data[0];
            this.queryUserManageData();
        },
        mainInit() {
            this.queryUserManageData();
            this.querySysRoleData();
        },
        // 查询用户管理列表
        async queryUserManageData() {
            this.loading = true;
            let params = {
                account: this.searchForm.account,
                realName: this.searchForm.name,
                page: this.page.page,
                limit: this.page.pageSize
            };
            try {
                let { code, data } = await getUserManageList(params);
                if (code == '200') {
                    this.tableData = data.rows;
                    this.page.page = data.pageNo;
                    this.page.total = data.totalRows;
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
            }
        },
        // 查询角色列表
        async querySysRoleData() {
            this.loading = true;
            let params = {
                page: this.page.page,
                limit: this.page.pageSize
            };
            try {
                let { code, data } = await getSysRoleList(params);
                if (code == '200') {
                    this.grantRoleList = data.rows.map(item => {
                        return {
                            code: item.roleId,
                            name: item.roleName
                        };
                    });
                    this.page.page = data.pageNo;
                    this.page.total = data.totalRows;
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
            }
        },
        // 处理查询
        handleSearchBtn() {
            this.queryUserManageData();
        },
        // 处理启用/停用
        handleStausFlagChange(row) {
            let status = row.statusFlag == '1' ? 1 : 2;
            let params = {
                statusFlag: status,
                userId: row.userId
            };
            userManageChangeStatus(params)
                .then(res => {
                    let { code, message } = res;
                    if (code == '200') {
                        this.queryUserManageData();
                        this.$message({
                            message,
                            type: 'success',
                            center: true
                        });
                    }
                })
                .catch(err => {
                    // 报错时，刷新switch按钮
                    this.queryUserManageData();
                    console.log(err);
                });
        },
        // 处理新增/修改
        handleAddAndModifyBtn(type, row) {
            this.type = type;
            this.editForm = row;
            let dialogType = 'user';
            this.dialogVisible[dialogType] = true;
        },
        // 处理删除角色按钮
        handleDeleteBtn(row) {
            let account = row.account;
            this.$confirm(`是否删除 ${account} 账号`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            })
                .then(() => {
                    userManageDelete(row)
                        .then(res => {
                            let { code, message } = res;
                            if (code == '200') {
                                this.queryUserManageData();
                                this.$message({
                                    message,
                                    type: 'success',
                                    center: true
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作！',
                        center: true
                    });
                });
        },
        // 处理分配角色按钮
        handleDistributeBtn(row) {
            this.editForm = row;
            let dialogType = 'authorize';
            this.dialogVisible[dialogType] = true;
        },
        // 处理重置密码
        handleResetPwdBtn(row) {
            this.$confirm(`是否重置密码为：<span style="color: #f00;font-size: 16px;">123456</span> 吗？`, '重置提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                center: true
            })
                .then(() => {
                    userManageResetPwd(row)
                        .then(res => {
                            let { code, message } = res;
                            if (code == '200') {
                                this.queryUserManageData();
                                this.$message({
                                    message,
                                    type: 'success',
                                    center: true
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作！',
                        center: true
                    });
                });
        },
        // 处理分配菜单按钮
        handleDistributionMenuBtn(row) {
            console.log('row: ', row);
            let dialogType = 'menu';
            this.dialogVisible[dialogType] = true;
        },
        // 处理序号
        indexMethod(index) {
            return (this.page.page - 1) * this.page.pageSize + index + 1;
        },
        // 处理分页
        handleSizeChange() {
            this.queryUserManageData();
        },
        handleCurrentChange() {
            this.queryUserManageData();
        }
    }
};
</script>

<style lang="scss" scoped>
.user-manage-page {
    .el-form .el-form-item {
        margin-right: 20px;
    }
    ::v-deep .el-table .el-table__cell {
        padding: 5px 0;
    }
}
</style>

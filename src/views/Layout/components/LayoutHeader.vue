<template>
    <div class="layoutheader-page">
        <div class="layoutheader-left">
            <div class="toggle-button" @click="toggleCollapse">
                <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div>
            <!-- 面包屑导航 -->
            <header-breadcrumb></header-breadcrumb>
        </div>
        <div class="layoutheader-right">
            <el-button size="small" type="primary" @click="logout">退出登录</el-button>
        </div>
    </div>
</template>

<script>
import headerBreadcrumb from './HeaderBreadcrumb.vue';
import { remove as removeStorage } from '@/utils/storage.js';
export default {
    name: 'layoutHeader',
    components: {
        'header-breadcrumb': headerBreadcrumb
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        }
    },
    methods: {
        toggleCollapse() {
            this.$store.commit('SET_COLLAPSE');
        },
        // 退出登录
        logout() {
            this.$store.dispatch('user/setToken', null);
            removeStorage('token', true);
            // 先清空tagsList
            this.$store.commit('CLEAR_TAGS');
            this.$message({
                type: 'success',
                message: '退出成功',
                center: true
            });
            this.$router.push({ path: '/login' });
        }
    }
};
</script>

<style lang="scss" scoped>
.layoutheader-page {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    .layoutheader-left {
        display: flex;
        align-items: center;
        .toggle-button {
            // margin-left: 10px;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>

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
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'layoutHeader',
    components: {
        'header-breadcrumb': headerBreadcrumb
    },
    computed: {
        // mapState辅助函数写法：
        ...mapState(['isCollapse'])
    },
    methods: {
        // vuex辅助函数
        ...mapMutations(['SET_COLLAPSE', 'CLEAR_TAGS']),
        // mapActions模块使用：
        ...mapActions('user', ['setToken']),

        toggleCollapse() {
            this.SET_COLLAPSE();
        },
        // 退出登录
        logout() {
            // 直接使用：
            // this.$store.dispatch('user/setToken', null);
            // mapActions辅助函数写法：
            this.setToken(null);
            removeStorage('token', true);
            // 先清空tagsList
            // 直接使用：
            // this.$store.commit('CLEAR_TAGS');
            // mapMutations辅助函数写法：
            this.CLEAR_TAGS();
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

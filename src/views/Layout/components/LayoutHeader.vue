<template>
    <div class="layoutheader-page">
        <div class="toggle-button" @click="toggleCollapse">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-button size="small" type="primary" @click="logout">退出登录</el-button>
    </div>
</template>

<script>
// import { remove as removeStorage } from '@/utils/storage.js';
export default {
    name: 'LayoutHeader',
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
            // this.$store.dispatch('user/setToken', null);
            // removeStorage('token', false);
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
    color: #fff;
    .toggle-button {
        // margin-left: 10px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
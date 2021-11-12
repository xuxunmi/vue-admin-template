<template>
    <div class="layoutmain-page">
        <!-- 路由占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'LayoutMain'
    // computed: {
    //     key() {
    //         return this.$route.path;
    //     }
    // }
};
</script>

<style lang="scss" scoped>
</style>
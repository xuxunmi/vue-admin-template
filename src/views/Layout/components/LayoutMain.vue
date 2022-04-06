<template>
    <!-- 路由占位符 -->
    <!-- 不能使用 keep-alive 缓存组件，会导致canvas报错 -->
    <!-- <keep-alive> -->
    <router-view :key="key"></router-view>
    <!-- </keep-alive> -->
</template>

<script>
export default {
    name: 'LayoutMain',
    computed: {
        key() {
            return this.$route.path;
        }
    }
};
</script>

<style lang="scss" scoped></style>

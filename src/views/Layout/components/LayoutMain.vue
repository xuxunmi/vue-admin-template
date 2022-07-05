<template>
    <!-- 路由占位符 -->
    <!-- 不能使用 keep-alive 缓存组件，会导致canvas报错 -->

    <!-- 组件过渡 -->
    <transition name="component-fade" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="key"></router-view>
        <!-- </keep-alive> -->
    </transition>
</template>

<script>
export default {
    name: 'layoutMain',
    computed: {
        key() {
            return this.$route.path;
        }
    }
};
</script>

<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
    opacity: 0;
}
</style>

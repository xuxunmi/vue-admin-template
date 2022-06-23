<template>
    <div class="sidebar-page">
        <!-- 一级导航 -->
        <!-- 有子集 -->
        <template v-if="routes.children && routes.children.length > 0">
            <el-submenu :index="routes.path + ''" :key="routes.id">
                <template slot="title">
                    <i :class="'iconfont ' + routes.meta.icon"></i>
                    <span>{{ routes.meta.title }}</span>
                </template>
                <!-- 二级导航 -->
                <nav-bar v-for="subMenu in routes.children" :key="subMenu.id" :routes="subMenu"></nav-bar>
            </el-submenu>
        </template>
        <!-- 无子集 -->
        <template v-else>
            <el-menu-item v-show="!routes.hidden" :index="routes.path + ''" :key="routes.id">
                <i v-if="routes.meta.icon" :class="'iconfont ' + routes.meta.icon"></i>
                <template slot="title">{{ routes.meta.title }}</template>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'navBar',
    props: {
        routes: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped>
.sidebar-page {
    .el-submenu,
    .el-menu-item {
        font-size: 13px;
        text-align: left !important;
    }
    ::v-deep .el-submenu__title,
    ::v-deep .el-menu-item {
        background-color: #324458 !important;
    }
    .el-menu-item:hover,
    ::v-deep .el-submenu__title:hover,
    .el-menu-item i:hover {
        outline: 0 !important;
        color: #fff !important;
        background-color: #6266a6 !important;
    }
    .iconfont {
        margin-right: 5px;
    }
}
</style>

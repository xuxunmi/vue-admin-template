<template>
    <div class="sidebar-page">
        <!-- 一级导航 -->
        <!-- 有子集 -->
        <template v-if="childItems.children && childItems.children.length > 0">
            <el-submenu :index="childItems.path + ''" :key="childItems.id">
                <template slot="title">
                    <i :class="'iconfont ' + childItems.meta.icon"></i>
                    <span>{{ childItems.meta.title }}</span>
                </template>
                <!-- 二级导航 -->
                <nav-bar v-for="subMenu in childItems.children" :key="subMenu.id" :childItems="subMenu"></nav-bar>
            </el-submenu>
        </template>
        <!-- 无子集 -->
        <template v-else>
            <el-menu-item v-show="!childItems.hidden" :index="childItems.path + ''" :key="childItems.id">
                <i v-if="childItems.meta.icon" :class="'iconfont ' + childItems.meta.icon"></i>
                <template slot="title">{{ childItems.meta.title }}</template>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'navBar',
    props: {
        childItems: {
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

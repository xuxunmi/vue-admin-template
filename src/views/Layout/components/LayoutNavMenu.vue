<template>
    <div class="layout-navmenu-page">
        <div class="header-wrap">
            <img :class="isCollapse ? 'header-img' : ''" src="@/assets/logo.png" alt="" />
            <span v-show="!isCollapse">管理后台系统</span>
        </div>

        <!-- 侧边栏导航区域 -->
        <el-menu
            :default-active="activePathIndex"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
        >
            <!-- 一级导航 -->
            <template v-for="menu in routers">
                <!-- 有子集 -->
                <el-submenu :index="menu.path + ''" :key="menu.id" v-if="menu.children && menu.children.length > 0">
                    <template slot="title">
                        <i :class="menu.meta.icon"></i>
                        <span>{{ menu.meta.title }}</span>
                    </template>
                    <!-- 二级导航 -->
                    <el-menu-item v-for="subMenu in menu.children" :index="subMenu.path + ''" :key="subMenu.id">
                        <template slot="title">
                            <i :class="subMenu.meta.icon"></i>
                            <span>{{ subMenu.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <!-- 无子集 -->
                <el-menu-item v-show="!menu.hidden" :index="menu.path + ''" :key="menu.id" v-else>
                    <i :class="menu.meta.icon"></i>
                    <template slot="title">{{ menu.meta.title }}</template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'LayoutNavMenu',
    data() {
        return {};
    },
    watch: {
        // 监听路由，打开相对应的侧边导航
        $route(to) {
            this.setActivePathIndex(to.path);
        }
    },
    computed: {
        // 当前激活路由
        activePathIndex: {
            get() {
                const path = this.$route.path;
                return path;
            },
            set() {}
        },
        // 静态路由
        routers() {
            return this.$router.options.routes[0].children;
        },
        isCollapse() {
            return this.$store.state.isCollapse;
        }
    },
    mounted() {
        console.log('this.$router.options.routes[0].children: ', this.$router.options.routes[0].children);
    },
    methods: {
        // 设置当前激活的导航栏
        setActivePathIndex(path) {
            this.activePathIndex = path;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="scss" scoped>
.layout-navmenu-page {
    height: 100%;
    .header-wrap {
        margin-left: 15px;
        color: #fff;
        img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }
        span {
            margin-left: 15px;
            line-height: 60px;
            vertical-align: middle;
        }
        .header-img {
            margin-top: 18px;
        }
    }
    .el-menu {
        border-right: none;
    }
    .el-submenu,
    .el-menu-item {
        text-align: left !important;
    }
    .el-menu-item:hover,
    ::v-deep .el-submenu__title:hover,
    .el-menu-item i:hover {
        outline: 0 !important;
        color: #fff !important;
        background-color: #33a2ef !important;
    }
}
</style>

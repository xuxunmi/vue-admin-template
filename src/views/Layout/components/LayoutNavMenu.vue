<template>
    <div class="layout-navmenu-page">
        <div class="header-wrap">
            <img :class="isCollapse ? 'header-img' : ''" src="@/assets/logo.png" alt="" />
            <span v-show="!isCollapse">管理后台系统</span>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
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
                <nav-bar v-for="route in routers" :key="route.id" :routes="route"></nav-bar>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import navBar from './navBar.vue';
import { mapState } from 'vuex';
export default {
    name: 'layoutNavMenu',
    components: {
        'nav-bar': navBar
    },
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
        // mapState辅助函数写法：
        ...mapState(['isCollapse'])
    },
    mounted() {
        console.log('this.$router.options.routes: ', this.$router.options.routes);
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
            display: inline;
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
    .el-scrollbar {
        height: calc(100% - 60px); // 必须设置el-scrollbar的高度
        background-color: #333744 !important;
        ::v-deep .scrollbar-wrapper {
            overflow-x: hidden !important;
        }
        ::v-deep .el-scrollbar__bar.is-horizontal{
            display: none !important;
        }
    }
    ::v-deep .el-menu--collapse > .sidebar-page > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow,
    ::v-deep .el-menu--collapse > .sidebar-page > .el-submenu > .el-submenu__title > span {
        display: none;
    }
}
</style>

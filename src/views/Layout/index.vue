<template>
    <div class="layout-page">
        <el-container class="layout-container">
            <!-- 左侧边导航栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <LayoutNavMenu></LayoutNavMenu>
            </el-aside>
            <!-- 页面主体区域 -->
            <el-container>
                <!-- 头部区域 -->
                <el-header>
                    <LayoutHeader></LayoutHeader>
                </el-header>
                <!-- 右侧内容主体 -->
                <el-main>
                    <LayoutMain></LayoutMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNavMenu from './components/LayoutNavMenu.vue';
import LayoutMain from './components/LayoutMain.vue';
export default {
    name: 'Layout',
    components: {
        LayoutNavMenu,
        LayoutHeader,
        LayoutMain
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        }
    }
};
</script>

<style lang="scss" scoped>
.layout-page {
    width: 100vw;
    height: 100%;
    .layout-container {
        width: 100vw;
        height: 100%;

        .el-aside {
            background-color: #333744;
        }
        .el-container {
            width: 100vw;
            .el-header {
                background-color: #fff;
            }
            .el-main {
                background-color: #eaedf1;
            }
        }
    }
}
</style>

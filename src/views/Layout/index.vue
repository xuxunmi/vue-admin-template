<template>
    <div class="layout-page">
        <el-container class="layout-container">
            <!-- 左侧边导航栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <layoutNavMenu></layoutNavMenu>
            </el-aside>
            <!-- 页面主体区域 -->
            <el-container>
                <!-- 头部区域 -->
                <el-header>
                    <layoutHeader></layoutHeader>
                </el-header>
                <!-- 右侧内容主体 -->
                <el-main>
                    <!-- tags标签页 -->
                    <mainTags></mainTags>
                    <!-- main主体内容 -->
                    <layoutMain></layoutMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import layoutHeader from './components/LayoutHeader.vue';
import layoutNavMenu from './components/LayoutNavMenu.vue';
import layoutMain from './components/LayoutMain.vue';
import mainTags from './components/MainTags.vue';
export default {
    name: 'layout',
    components: {
        layoutNavMenu,
        layoutHeader,
        layoutMain,
        mainTags
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
                background-color: #333744;
            }
            .el-main {
                width: 100%;
                padding: 0 !important;
                // background-color: #eaedf1;
            }
        }
    }
}
</style>

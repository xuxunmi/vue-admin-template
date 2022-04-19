<template>
    <div class="header-breadcrumb-page">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(route, index) in breadcrumbItems" :key="index">
                <span>{{ route.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'headerBreadcrumb',
    data() {
        return {
            breadcrumbItems: []
        };
    },
    created() {
        this.geBreadcrumbItems(this.$route);
    },
    methods: {
        geBreadcrumbItems(route) {
            // 获取当前页面的路由组
            this.breadcrumbItems = route.matched;
            // 从下标为1的位置开始获取路由，去除了最外层定义的根路由信息，并且获取到的数组里面只有meta数据，方便我们取值
            this.breadcrumbItems = route.matched.map(item => item.meta).splice(1);
            console.log('this.breadcrumbItems: ', this.breadcrumbItems);
        }
    },
    watch: {
        $route(newVal) {
            this.geBreadcrumbItems(newVal);
        }
    }
};
</script>

<style lang="scss" scoped>
.header-breadcrumb-page {
    margin-left: 10px;
    .el-breadcrumb {
        font-size: 16px !important;
    }
}
</style>

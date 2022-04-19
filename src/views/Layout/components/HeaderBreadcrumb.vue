<template>
    <div class="header-breadcrumb-page">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :to="item.path" :key="index">
                <span>{{ item.meta.title }}</span>
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
        this.getBreadcrumbItems(this.$route);
    },
    methods: {
        getBreadcrumbItems(route) {
            let breadcrumbList = route.matched.filter(item => {
                if (item.meta && item.meta.title) {
                    if (item.redirect === undefined) {
                        item.path = '';
                    }
                    return true;
                }
            });
            if (breadcrumbList[0].meta.title !== '首页') {
                breadcrumbList.unshift({ path: '/', meta: { title: '首页' } });
            }
            this.breadcrumbItems = breadcrumbList;
        }
    },
    watch: {
        $route(newVal) {
            this.getBreadcrumbItems(newVal);
        }
    }
};
</script>

<style lang="scss" scoped>
.header-breadcrumb-page {
    margin-left: 10px;
    .el-breadcrumb {
        font-size: 16px !important;
        ::v-deep .el-breadcrumb__inner,
        ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
            color: #fff;
        }
    }
}
</style>

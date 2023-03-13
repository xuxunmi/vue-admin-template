<template>
    <div class="layoutheader-page h-full flex justify-between items-center">
        <div class="layoutheader-left">
            <div class="toggle-button" @click="toggleCollapse">
                <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div>
            <!-- 面包屑导航 -->
            <header-breadcrumb></header-breadcrumb>
        </div>
        <div class="layoutheader-right">
            <el-dropdown class="mr-2" @command="handleCommand">
                <el-button size="mini" type="primary">
                    {{ $t('header.language') }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="zh_CN">{{ $t('header.btnZh') }}</el-dropdown-item>
                        <el-dropdown-item command="en-US">{{ $t('header.btnEn') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button size="mini" type="primary" @click="logout">{{ $t('header.logout') }}</el-button>
        </div>
    </div>
</template>

<script>
import headerBreadcrumb from './HeaderBreadcrumb.vue';
import { set as setStorage, remove as removeStorage } from '@/utils/storage.js';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'layoutHeader',
    components: {
        'header-breadcrumb': headerBreadcrumb
    },
    computed: {
        // mapState辅助函数写法：
        ...mapState(['isCollapse'])
    },
    methods: {
        // vuex辅助函数
        ...mapMutations(['SET_COLLAPSE', 'CLEAR_TAGS']),
        ...mapMutations('permission', ['SET_MENU_LIST']),
        // mapActions模块使用：
        ...mapActions('user', ['setToken']),

        toggleCollapse() {
            this.SET_COLLAPSE();
        },
        // 处理语言按钮
        handleCommand(command) {
            command === 'zh_CN' ? this.switchLanguageHandler('zh_CN') : this.switchLanguageHandler('en-US');
        },
        // 切换语言
        switchLanguageHandler(type) {
            console.log('当前选择的语言: ' + type);
            console.log('this.$i18n.locale: ', this.$i18n.locale);
            switch (type) {
                case 'zh_CN':
                    this.$i18n.locale = type;
                    setStorage('lang', 'zh_CN', false);
                    break;
                case 'en-US':
                    this.$i18n.locale = type;
                    setStorage('lang', 'en-US', false);
                    break;
            }
        },
        // 退出登录
        logout() {
            // this.$store.dispatch('user/setToken', null); // 直接使用：
            this.setToken(null); // mapActions辅助函数写法：
            // 清空token
            removeStorage('token', true);
            // 清空切换语言
            removeStorage('lang', true);

            // 清空动态路由
            this.SET_MENU_LIST([]);

            // 先清空tagsList
            // this.$store.commit('CLEAR_TAGS'); // 直接使用：
            this.CLEAR_TAGS(); // mapMutations辅助函数写法：

            this.$message({
                type: 'success',
                message: '退出成功',
                center: true
            });
            this.$router.push({ path: '/login' });
        }
    }
};
</script>

<style lang="scss" scoped>
.layoutheader-page {
    font-size: 16px;
    .layoutheader-left {
        display: flex;
        align-items: center;
        .toggle-button {
            // margin-left: 10px;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>

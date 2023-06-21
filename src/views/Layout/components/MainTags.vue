<template>
    <div class="tags-page" :class="isCollapse ? 'w-calc-64 ' : 'w-calc-200'" v-if="showTags">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <ul class="item-list">
                <li
                    class="tags-item"
                    v-for="(item, index) in tagsList"
                    :class="{ active: isActive(item.path) }"
                    :key="index"
                >
                    <router-link :to="item.path" class="tags-item-title">{{ item.title }}</router-link>
                    <span class="tags-item-icon" @click="closeTags(index)">
                        <i v-show="tagsList.lenght !== 1 && item.title !== '首页'" class="el-icon-close"></i>
                    </span>
                </li>
            </ul>
        </el-scrollbar>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    {{ $t('tags.tagOptions') }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">{{ $t('tags.closeOther') }}</el-dropdown-item>
                        <el-dropdown-item command="all">{{ $t('tags.closeAll') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- <el-tag
            size="small"
            v-for="(tag, index) in tagsList"
            :key="index"
            :closable="tag.name !== '首页'"
            :disable-transitions="false"
            @close="handleClose(tag, index)"
            @click="changeMenu(tag)"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
        >
            {{ tag.title }}
        </el-tag> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'mainTags',
    computed: {
        ...mapState(['isCollapse', 'tagsList']),
        showTags() {
            return this.tagsList.length > 0;
        }
    },
    watch: {
        $route: {
            handler(to) {
                if (!to.meta) return;
                this.setTags(to);
            },
            immediate: true,
            deep: true
        }
    },
    // created() {
    //     console.log('this.tagsList: ', this.tagsList);
    // },
    methods: {
        ...mapMutations(['DEL_TAGS', 'SET_TAGS', 'CLEAR_TAGS', 'CLOSE_TAGSOther']),
        // handleClose(tag) {
        //     this.tagsList.splice(this.tagsList.indexOf(tag), 1);
        // },
        // changeMenu(route) {
        //     console.log(route);
        //     this.$router.push({ path: route.path });
        // },
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭当前标签
        closeTags(index) {
            const delItem = this.tagsList[index];
            this.DEL_TAGS({ index });
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push({ path: item.path });
            }
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (this.tagsList.length >= 9) {
                    this.DEL_TAGS({ index: 0 });
                }
                this.SET_TAGS({
                    name: route.name,
                    title: route.meta.title,
                    path: route.fullPath
                });
            }
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        },
        // 关闭全部标签
        closeAll() {
            // 判断当前tags是否唯一且为首页
            if (this.tagsList.length === 1 && this.$route.name === 'home') return;
            this.CLEAR_TAGS();
            // 设置tagsList
            this.SET_TAGS({
                name: 'home',
                title: '首页',
                path: '/home'
            });
            this.$router.push({ path: '/home' });
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            });
            this.CLOSE_TAGSOther(curItem);
        }
    }
};
</script>

<style lang="scss" scoped>
.w-calc-64 {
    width: calc(100% - 64px) !important;
}
.w-calc-200 {
    width: calc(100% - 200px) !important;
}
.tags-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    overflow: hidden;
    height: 40px;
    padding: 0 10px;
    box-shadow: 0px 5px 3px 0px #ddd;
    z-index: 999;
    white-space: nowrap;
    background-color: #fff;
    .el-scrollbar {
        height: 40px; // 必须设置el-scrollbar的高度
        ::v-deep .scrollbar-wrapper {
            overflow-x: hidden !important;
            overflow-y: hidden !important;
        }
        ::v-deep .el-scrollbar__bar.is-vertical {
            display: none !important;
        }
        .item-list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 13px;
            color: black;
            font-weight: 600;
            line-height: 40px;
        }
        .tags-item {
            height: 40px;
            margin-right: 6px;
            padding: 0 10px 0 5px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;

            -webkit-transition: all 0.3s ease-in;
            -moz-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
            cursor: pointer;

            &-title,
            &-icon {
                position: relative;
                top: 1px;
            }
            &-title {
                min-width: 50px;
                color: black;
            }
            &-icon {
                margin-left: 5px;
                font-size: 12px;
            }
        }
        .tags-item:not(.active):hover {
            background-color: #3091ec;
            border-radius: 3px;
        }
        .tags-item.active {
            border-bottom: 2px solid #409eff;
        }
    }
}
</style>

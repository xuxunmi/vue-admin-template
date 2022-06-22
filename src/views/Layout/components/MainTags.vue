<template>
    <div class="tags-page" :class="isCollapse ? 'w-calc-64 ' : 'w-calc-200'" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item, index) in tagsList" :class="{ active: isActive(item.path) }" :key="index">
                <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <i v-show="tagsList.lenght !== 1 && item.title !== '首页'" class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
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
        $route(to) {
            this.setTags(to);
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
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    overflow: hidden;
    height: 40px;
    padding: 0 10px;
    background-color: #eaedf1;
    box-shadow: 0 5px 10px #ddd;
    z-index: 999;
    ul {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .tags-li {
        box-sizing: border-box;
        height: 30px;
        margin: 0 3px;
        padding: 0 10px;
        border: 1px solid #e9eaec;
        border-radius: 3px;
        font-size: 13px;
        line-height: 30px;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
        cursor: pointer;
    }
    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }
    .tags-li.active {
        background-color: #409eff;
    }
    .tags-li-title {
        max-width: 80px;
        color: #666;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
    }
}
</style>

<template>
    <div class="table-plus-toolbar">
        <div>
            <el-button v-if="showAddBtn" type="primary" size="small" @click="$emit('row-add')">新增</el-button>
            <el-button
                v-if="showAddChildBtn"
                class="table-plus-toolbar__btn"
                size="small"
                @click="$emit('row-add-child')"
            >
                新增子项
            </el-button>
            <el-popconfirm
                v-if="showRemoveBtn"
                class="table-plus-toolbar__btn"
                title="确定删除选择的行吗？"
                @confirm="$emit('row-remove')"
            >
                <el-button slot="reference" size="small">移除</el-button>
            </el-popconfirm>
            <el-button
                v-for="(item, index) in customBtns"
                class="table-plus-toolbar__btn"
                :key="index"
                :type="item.type"
                size="small"
                @click="$emit('custom-btn-click', item.onClick)"
            >
                {{ item.label }}
            </el-button>
        </div>
        <div class="table-plus-toolbar__right">
            <el-input
                v-model="searchText"
                class="table-plus-toolbar__search"
                placeholder="搜索"
                prefix-icon="el-icon-search"
                size="small"
                @change="handleSearchTextChange"
            />

            <el-popover trigger="click">
                <div slot="reference">
                    <el-button size="small">
                        筛选列
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </div>
                <el-checkbox-group v-model="filteredColumns" @change="handleFilteredColumnsChange">
                    <el-checkbox
                        v-for="column in columns"
                        class="table-plus-toolbar__columns-filter-checkbox"
                        :label="column.prop"
                        :key="column.prop"
                        checked
                    >
                        {{ column.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'TablePlusToolbar',
    props: {
        showAddBtn: {
            type: Boolean,
            default: true
        },
        showAddChildBtn: {
            type: Boolean,
            default: true
        },
        showRemoveBtn: {
            type: Boolean,
            default: true
        },
        customBtns: {
            type: Array,
            default: () => []
        },
        showSearchBar: {
            type: Boolean,
            default: true
        },
        showFilterBar: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // 当前搜索文字
            searchText: '',
            // 当前选中的列
            filteredColumns: []
        };
    },
    methods: {
        /**
         * 搜索文字变化
         */
        handleSearchTextChange(val) {
            this.$emit('search', val.trim());
        },

        /**
         * 筛选列变化
         */
        handleFilteredColumnsChange(value) {
            this.$emit('filtered-columns-change', value);
        }
    }
};
</script>

<style lang="scss" scoped>
.table-plus-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    &__btn {
        &:not(:last-child) {
            margin-right: 10px;
        }
    }

    &__right {
        display: flex;
    }

    &__search {
        margin-right: 10px;
    }

    &__columns-filter-checkbox {
        display: block;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}
</style>

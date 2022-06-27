<template>
    <div class="flex justify-between mb-4">
          <el-input
            v-if="showSearchBar"
            v-model="searchText"
            class="w-60"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            size="mini"
            @change="handleSearchTextChange"
        />
        <div class="flex flex-1 ml-4">
            <el-button v-if="showAddBtn" class="mr-3" type="primary" size="mini" plain @click="$emit('row-add')"
                >新增(N)</el-button
            >
            <el-button v-if="showAddChildBtn" class="mr-3" size="mini" plain @click="$emit('row-add-child')">
                新增子项(N)
            </el-button>
            <el-button v-if="showModifyBtn" class="mr-3" size="mini" plain @click="$emit('row-modify')">修改(M)</el-button>
            <el-popconfirm v-if="showEnableBtn" class="mr-3" title="确定启用选择的记录吗？" @confirm="$emit('row-enable')">
                <el-button slot="reference" type="success" size="mini" plain>启用</el-button>
            </el-popconfirm>
            <el-popconfirm v-if="showDisableBtn" class="mr-3" title="确定停用选择的记录吗？" @confirm="$emit('row-disable')">
                <el-button slot="reference" size="mini" plain>停用</el-button>
            </el-popconfirm>
            <el-popconfirm
                v-if="showBeInvalidBtn"
                class="mr-3"
                title="确定作废选择的记录吗？"
                @confirm="$emit('row-be-invalid')"
            >
                <el-button slot="reference" type="warning" size="mini" plain>作废</el-button>
            </el-popconfirm>
            <el-popconfirm
                v-if="showRemoveBtn"
                class="mr-3"
                title="确定删除选择的记录吗？"
                @confirm="$emit('row-remove')"
            >
                <el-button slot="reference" type="danger" size="mini" plain>删除</el-button>
            </el-popconfirm>
            <el-button
                v-for="(item, index) in customBtns"
                class="mr-3"
                :key="index"
                :type="item.type"
                size="mini"
                @click="$emit('custom-btn-click', item.onClick)"
            >
                {{ item.label }}
            </el-button>

            <el-popover v-if="showFilterBar" trigger="click">
                <div slot="reference">
                    <el-button size="mini">
                        筛选列
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </div>
                <el-checkbox-group v-model="filteredColumns" @change="handleFilteredColumnsChange">
                    <el-checkbox v-for="column in columns" class="" :label="column.prop" :key="column.prop" checked>
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
        showModifyBtn: {
            type: Boolean,
            default: true
        },
        showBeInvalidBtn: {
            type: Boolean,
            default: true
        },
        showRemoveBtn: {
            type: Boolean,
            default: true
        },
        showEnableBtn: {
            type: Boolean,
            default: true
        },
        showDisableBtn: {
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
::v-deep .el-button + .el-button {
    margin-left: initial;
}
</style>

<template>
    <el-select
        v-if="type === 'select'"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :placeholder="$attrs.placeholder || '请选择'"
        :size="size"
        @input="handleInput"
    >
        <el-option
            v-for="item in options"
            :key="item[optionValue]"
            :label="item[optionLabel]"
            :value="item[optionValue]"
        />
    </el-select>
    <el-switch
        v-else-if="type === 'switch'"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :size="size"
        @input="handleInput"
    />
    <el-input-number
        v-else-if="type === 'inputNumber'"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
        @input="handleInput"
    />
    <el-date-picker
        v-else-if="type === 'datePicker'"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :placeholder="$attrs.placeholder || '请选择日期'"
        :value-format="$attrs.valueFormat"
        :type="$attrs.pickerType"
        :size="size"
        @input="handleInput"
    />
    <el-input
        v-else
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :type="type"
        :placeholder="$attrs.placeholder || '请输入'"
        :size="size"
        @input="handleInput"
    />
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'TablePlusControl',
    props: {
        /**
         * edit 类型, select | input
         */
        type: {
            type: String,
            default: 'input'
        },
        /**
         * 可选项
         */
        options: {
            type: Array,
            default: () => []
        },
        /**
         * 可选项 label 属性名
         */
        optionLabel: {
            type: String,
            default: 'label'
        },
        /**
         * 可选项 value 属性名
         */
        optionValue: {
            type: String,
            default: 'value'
        },
        value: {
            required: true
        },
        onChange: {
            type: Function
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
    computed: {
        size() {
            return this.$attrs.size ?? 'mini';
        }
    },
    methods: {
        /**
         * 处理输入
         */
        handleInput(val) {
            // console.log('val更新值: ', val)
            this.$emit('input', val);
        }
    }
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-input__inner {
//     padding: 1px 4px;
// }
// ::v-deep .el-textarea__inner {
//     padding: 1px 4px;
// }
</style>

<template>
    <div class="app-layout">
        <h1 class="mb-8">TablePlus表格：</h1>
        <div class="app-layout__container">
            <div class="app-layout__left">
                <table-plus
                    :columns="columns"
                    :data-source="dataSource"
                    :custom-btns="customBtns"
                    :initial-row-model="initialRowModel"
                    row-key="id"
                    row-sortable
                    row-editable
                    stripe
                    @row-remove="handleRowRemove"
                    @row-edit-value-change="handleRowEditValueChange"
                >
                    <template v-slot:status="{ row }">
                        <el-tag :type="row.status === 1 ? 'success' : 'info'" size="mini">
                            {{ row.status === 1 ? '启用' : row.status === 0 ? '停用' : '未知' }}
                        </el-tag>
                    </template>
                </table-plus>
            </div>
            <div class="app-layout__right">
                <h2 class="app-layout__title">说明</h2>
                <p>1. 支持工具栏按钮控制</p>
                <p>2. 支持设置自定义按钮并绑定选中的数据</p>
                <p>3. 支持服务端搜索</p>
                <p>4. 支持筛选列</p>
                <p>5. 支持行拖拽排序</p>
                <p>6. 支持分页</p>
                <p>7. 支持行内编辑（保存、取消）</p>
                <p>8. 支持选择某项自动带出其他项</p>
                <p>9. 支持排序</p>
            </div>
        </div>
    </div>
</template>

<script>
import TablePlus from '@/components/tablePlus/index.vue';
import ExportExcel from 'js-export-excel';

const nameOptions = [
    { id: 100, name: '可选项1', age: 1, sex: '男', city: '无锡' },
    { id: 200, name: '可选项2', age: 2, sex: '女', city: '南通' }
];

export default {
    name: 'Home',
    components: {
        TablePlus
    },
    data() {
        return {
            columns: [
                {
                    prop: 'name',
                    label: '姓名',
                    width: '180',
                    editable: true,
                    editProps: {
                        type: 'select',
                        options: nameOptions,
                        optionLabel: 'name',
                        optionValue: 'id'
                    }
                },
                { prop: 'age', label: '年龄', width: '180', editable: true, sortable: true },
                { prop: 'sex', label: '性别', editable: false, width: '180' },
                { prop: 'city', label: '城市', editable: true },
                {
                    prop: 'status',
                    label: '状态',
                    slotProp: 'status',
                    editable: true,
                    editProps: {
                        type: 'switch',
                        activeValue: 1,
                        inactiveValue: 0
                    },
                    formatter: row => {
                        // return this.statusList.find(item => item.id === row.status)?.name;
                        return row.status === 1 ? '启用' : row.status === 0 ? '停用' : '未知';
                    }
                }
            ],
            dataSource: [
                {
                    id: 1,
                    name: '张三',
                    age: 22,
                    sex: '男',
                    city: '上海',
                    status: 1,
                    children: [
                        { id: 11, name: '张三1', age: 1, sex: '男', city: '徐汇', status: 1 },
                        { id: 12, name: '张三2', age: 2, sex: '男', city: '浦东', status: 1 }
                    ]
                },
                { id: 2, name: '李四', age: 28, sex: '女', city: '苏州', status: 0 },
                { id: 3, name: '王五', age: 20, sex: '女', city: '杭州', status: 1 },
                { id: 4, name: '赵六', age: 18, sex: '男', city: '南京', status: 1 }
            ],
            initialRowModel: {
                sex: '男'
            },
            customBtns: [
                {
                    label: '自定义按钮',
                    onClick: selections => {
                        const names = selections.filter(item => item.name).map(item => item.name);
                        if (names.length) {
                            this.$message.info(`选中了${names.join('、')}`);
                        }
                    }
                },
                { label: '导出 Excel', onClick: this.handleExportExcel }
            ]
        };
    },
    methods: {
        // 处理导出Excel按钮
        handleExportExcel() {
            const columns = this.columns.filter(item => item.label);
            // TODO：待处理处理树形结构表格，目无法导出children中的数据的问题
            const sheetData = this.dataSource.map(item =>
                columns.map(columnItem => (columnItem.formatter ? columnItem.formatter(item) : item[columnItem.prop]))
            );
            const option = {
                fileName: '导出插件使用',
                datas: [
                    {
                        sheetHeader: columns.map(item => item.label),
                        sheetData: sheetData,
                        columnWidths: new Array(columns.length).fill(10)
                    }
                ]
            };
            const toExcel = new ExportExcel(option);
            toExcel.saveExcel();
        },
        /**
         * 行编辑变化
         */
        handleRowEditValueChange({ value, prop, rowModel }) {
            if (prop === 'name') {
                const option = nameOptions.find(item => item.id === value);
                Object.assign(rowModel, option);
            }
        },

        /**
         * 行移除
         */
        handleRowRemove(selections, handleRemove) {
            const names = selections.filter(item => item.name).map(item => item.name);
            if (names.length) {
                this.$message.success(`移除了${names.join('、')}`);
            }
            handleRemove();
        }
    }
};
</script>

<style lang="scss" scoped>
.app-layout {
    height: 100%;
    margin-top: 50px;
    padding: 16px 32px;
    box-sizing: border-box;

    &__container {
        display: flex;
    }

    &__title {
        margin-bottom: 24px;
    }

    &__left {
        width: 50%;
        padding-right: 20px;
    }

    &__right {
        width: 50%;
        padding-left: 20px;
    }
}
</style>

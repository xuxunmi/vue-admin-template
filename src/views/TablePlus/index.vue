<template>
    <div class="app-layout w-full h-full overflow-hidden p-10" :class="{ 'pt-16': tagsList.length }">
        <h1 class="mb-8">TablePlus表格：</h1>
        <div class="app-layout__container h-full">
            <div ref="tableWrapper" class="app-layout__left">
                <table-plus
                    ref="tablePlus"
                    :loading="loading"
                    :columns="columns"
                    :data-source="dataSource"
                    :custom-btns="customBtns"
                    :initial-row-model="initialRowModel"
                    :summary-method="getSummaries"
                    show-summary
                    row-key="id"
                    row-sort-sequence-field="sequence"
                    size="mini"
                    row-sortable
                    row-editable
                    row-local-remove
                    stripe
                    border
                    :maxHeight="tableHeight"
                    @row-remove="handleRowRemove"
                    @row-edit-value-change="handleRowEditValueChange"
                    @row-select="hanldeRowSelect"
                >
                    <!-- <template v-slot:status="{ row }">
                        <el-tag :type="row.status === 1 ? 'success' : 'info'" size="mini">
                            {{ row.status === 1 ? '启用' : row.status === 0 ? '停用' : '未知' }}
                        </el-tag>
                    </template> -->
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
import { formatFloat } from '@/utils/tools';
import { mapState } from 'vuex';

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
            loading: false,
            statusList: [
                {
                    id: 0,
                    name: '停用'
                },
                {
                    id: 1,
                    name: '启用'
                }
            ],
            columns: [
                { prop: 'sequence', width: '60', fixed: 'left' },
                {
                    prop: 'name',
                    label: '姓名',
                    width: '180',
                    align: 'center',
                    showOverflowTooltip: true,
                    editable: true,
                    editProps: {
                        type: 'select',
                        options: nameOptions,
                        optionLabel: 'name',
                        optionValue: 'id'
                    }
                },
                {
                    prop: 'sex',
                    label: '性别',
                    align: 'center',
                    showOverflowTooltip: true,
                    editable: false,
                    width: '180'
                },
                {
                    prop: 'age',
                    label: '年龄',
                    align: 'center',
                    showOverflowTooltip: true,
                    editable: true,
                    sortable: true,
                    width: '180'
                },
                { prop: 'city', label: '城市', align: 'center', showOverflowTooltip: true, editable: true },
                { prop: 'deposit', label: '存款', align: 'center', showOverflowTooltip: true, editable: true },
                {
                    prop: 'status', // 用于 formatter 属性
                    label: '状态',
                    // slotProp: 'status', // 用template具名插槽属性
                    align: 'center',
                    showOverflowTooltip: true,
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
                    sequence: 1,
                    name: '三上悠亚',
                    age: 22,
                    sex: '男',
                    city: '上海',
                    deposit: 99,
                    status: 1,
                    children: [
                        {
                            id: 11,
                            sequence: '1-1',
                            name: '河北彩花',
                            age: 18,
                            sex: '女',
                            city: '徐汇',
                            deposit: 98,
                            status: 1
                        },
                        {
                            id: 12,
                            sequence: '1-2',
                            name: '深田咏美',
                            age: 28,
                            sex: '女',
                            city: '浦东',
                            deposit: 97,
                            status: 1
                        }
                    ]
                },
                { id: 2, sequence: 2, name: '明日花绮罗', age: 28, sex: '女', city: '苏州', deposit: 99, status: 0 },
                { id: 3, sequence: 3, name: '桃乃木香奈', age: 20, sex: '女', city: '杭州', deposit: 88, status: 1 },
                { id: 4, sequence: 4, name: '葵伊吹', age: 18, sex: '男', city: '南京', deposit: 87, status: 1 },
                { id: 5, sequence: 5, name: '楪可怜', age: 18, sex: '男', city: '南京', deposit: 87, status: 1 }
            ],
            customBtns: [
                {
                    label: '自定义按钮',
                    onClick: selections => {
                        const names = selections.filter(item => item.name).map(item => item.name);
                        if (names.length) {
                            this.$message({
                                type: 'info',
                                message: `选中了${names.join('、')}`,
                                center: true
                            });
                        }
                    }
                },
                { label: '导出 Excel', onClick: this.handleExportExcel }
            ],
            tableHeight: undefined // 自适应表格高度
        };
    },
    computed: {
        ...mapState(['tagsList']),
        initialRowModel() {
            return {
                name: undefined,
                sex: '男',
                age: undefined,
                city: undefined,
                deposit: undefined,
                status: 0
            };
        }
    },
    mounted() {
        // v2写法
        // console.log('this.$refs.tableWrapper.clientHeight: ', this.$refs.tableWrapper.clientHeight);
        this.setTableHeight();
        window.addEventListener('resize', this.setTableHeight);

        // v3+ts写法
        // const tableWrapper = ref(); // 获取父级refs
        // const tableHeight = ref(0);
        // tableHeight.value = tableWrapper.value.clientHeight;
    },
    beforeDestroy() {
        // 组件销毁前，移除窗口大小变化事件监听器
        window.removeEventListener('resize', this.setTableHeight);
    },
    methods: {
        /**
         * 动态计算表格高度
         */
        setTableHeight() {
            const tableWrapperHeight = this.$refs.tableWrapper.clientHeight;
            this.tableHeight = tableWrapperHeight;
        },
        /**
         * 处理导出Excel按钮
         */
        handleExportExcel() {
            const columns = this.columns.filter(item => item.label);
            console.log('columns: ', columns);
            // TODO：待处理处理树形结构表格，目无法导出children中的数据的问题
            const sheetData = this.dataSource.map(item =>
                columns.map(columnItem => (columnItem.formatter ? columnItem.formatter(item) : item[columnItem.prop]))
            );
            console.log('sheetData: ', sheetData);
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
         * 行编辑变化,带出当前行其他值
         */
        handleRowEditValueChange({ value, prop, rowModel }) {
            if (prop === 'name') {
                const option = nameOptions.find(item => item.id === value);
                console.log('option: ', option);
                Object.assign(rowModel, option);
            }
        },
        /**
         * 行移除(可用于操作接口)
         */
        handleRowRemove(selections) {
            const names = selections.filter(item => item.name).map(item => item.name);
            if (names.length) {
                this.$message({
                    type: 'success',
                    message: `移除了${names.join('、')}`,
                    center: true
                });
            }
        },
        /**
         *  行选中
         */
        hanldeRowSelect(selectedRows) {
            console.log('行选中selectedRows: ', selectedRows);
        },
        /**
         * 表尾总计: 第一种方式
         */
        // getSummaries({ columns, data }) {
        //     return columns.reduce((acc, _, index) => {
        //         if (index === 0) {
        //             acc[index] = '';
        //         } else if (index === 1) {
        //             acc[index] = '';
        //         }  else if (index === 2) {
        //             acc[index] = '';
        //         } else if (index === 3) {
        //             acc[index] = '合计';
        //         } else if (index === 4) {
        //             acc[index] = '/';
        //         } else if (index === 5) {
        //             acc[index] =
        //                 formatFloat(
        //                     data.reduce((acc, cur) => {
        //                         return acc + (cur.age || 0);
        //                     }, 0),
        //                     4
        //                 ) + ' 岁';
        //         } else if (index === 6) {
        //             acc[index] = '/';
        //         } else if (index === 7) {
        //             acc[index] =
        //                 formatFloat(
        //                     data.reduce((acc, cur) => {
        //                         return acc + (cur.deposit || 0);
        //                     }, 0),
        //                     4
        //                 ) + ' 万';
        //         }
        //         return acc;
        //     }, {});
        // }
        /**
         * 表尾总计: 第二种方式
         */
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '';
                } else if (index === 1) {
                    sums[index] = '';
                } else if (index === 2) {
                    sums[index] = '';
                } else if (index === 3) {
                    sums[index] = '合计';
                } else if (index === 4) {
                    sums[index] = 'N/A';
                } else if (index === 6) {
                    sums[index] = 'N/A';
                }
                const values = data.map(item => Number(item[column.property]));
                if (column.property === 'age' || column.property === 'deposit') {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = formatFloat(sums[index], 4) + ' 万';
                }
            });
            return sums;
        }
    }
};
</script>

<style lang="scss" scoped>
.app-layout {
    &__container {
        display: flex;
    }

    &__title {
        margin-bottom: 24px;
    }

    &__left {
        width: 80%;
        padding-right: 20px;
    }

    &__right {
        width: 30%;
        padding-left: 20px;
    }
}
</style>

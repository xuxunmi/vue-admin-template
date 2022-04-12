<template>
    <div class="user-manage-page">
        <div class="vxe-table">
            <h1>vxe-table表格使用示例：</h1>
            <vxe-toolbar export print zoom custom>
                <template #buttons>
                    <vxe-button @click="insertEvent">新增</vxe-button>
                    <vxe-button @click="importDataEvent">导入数据</vxe-button>
                </template>
            </vxe-toolbar>
            <vxe-table
                round
                border
                keep-source
                height="500"
                ref="vxeTableRef"
                :loading="loading"
                align="center"
                :column-config="{ resizable: true }"
                :scroll-y="{ enabled: false }"
                :row-config="{ isHover: true }"
                :tooltip-config="{ showAll: true, enterable: true, contentMethod: showTooltipMethod }"
                :data="vxeTableData"
                :checkbox-config="{ trigger: 'row', highlight: true, range: true }"
                @checkbox-all="selectAllEvent"
                @checkbox-change="selectChangeEvent"
                show-overflow
                row-id="id"
                :print-config="{}"
                :export-config="{}"
                :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            >
                <vxe-column type="checkbox" title="ID" width="140"></vxe-column>
                <vxe-column field="name" title="姓名" sortable></vxe-column>
                <vxe-column field="sex" title="性别" :formatter="formatSex" sortable></vxe-column>
                <vxe-column field="age" title="年龄" sortable></vxe-column>
                <vxe-column field="date" title="时间" :formatter="formatDate" sortable></vxe-column>
                <vxe-column field="content" title="内容" type="html" show-overflow></vxe-column>
                <vxe-column title="操作" fixed="right">
                    <template v-slot="{ row }">
                        <div>
                            <el-button type="primary" size="small" @click="handledeleteBtn(row)">删除</el-button>
                        </div>
                    </template>
                </vxe-column>
                <template #empty>
                    <span style="color: red;">
                        <img src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif" />
                        <p>没有更多数据了！</p>
                    </span>
                </template>
            </vxe-table>
        </div>
    </div>
</template>

<script>
// import { iconfontList } from '@/utils/iconfontList.js';
import XEUtils from 'xe-utils';

export default {
    data() {
        return {
            // 图标
            // iconfontList,
            loading: false,
            // 表格数据
            vxeTableData: [
                {
                    id: 10001,
                    name: '荒天帝',
                    sex: '1',
                    age: 18,
                    date: '1599320101520',
                    content:
                        '<img height="40" src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif">'
                },
                {
                    id: 10002,
                    name: '叶天帝',
                    sex: '1',
                    age: 18,
                    date: '1599320111520',
                    content:
                        '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">'
                },
                {
                    id: 10003,
                    name: '无始大帝',
                    sex: '1',
                    age: 18,
                    date: '1599320121520',
                    content:
                        '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">'
                },
                {
                    id: 10003,
                    name: '狠人大帝',
                    sex: '0',
                    age: 20,
                    date: '1599320131520',
                    content:
                        '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">'
                },
                {
                    id: 10004,
                    name: '段德',
                    sex: '1',
                    age: 30,
                    date: '1599320091520',
                    content: '<div><span style="color: red">防狼防盗防段德...</span></div>'
                }
            ]
        };
    },
    methods: {
        // 新增数据
        insertEvent() {
            const $table = this.$refs.vxeTableRef;
            const newRow = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd HH:ss:mm')
            };
            $table.insert(newRow).then(({ row }) => $table.setActiveRow(row));
        },
        // 导入数据
        importDataEvent() {
            this.$refs.vxeTableRef.importData();
        },
        async handledeleteBtn(rowData) {
            console.log(rowData);
            const $table = this.$refs.vxeTableRef;
            await $table.remove(rowData);
        },
        // 表格全选
        selectAllEvent({ checked }) {
            const records = this.$refs.vxeTableRef.getCheckboxRecords();
            console.log(checked ? '所有勾选事件' : '所有取消事件', records);
        },
        // 表格单选
        selectChangeEvent({ checked }) {
            const records = this.$refs.vxeTableRef.getCheckboxRecords();
            console.log(checked ? '勾选事件' : '取消事件', records);
        },
        // 格式化性别
        formatSex({ cellValue }) {
            return cellValue ? (cellValue === '1' ? '男' : '女') : '';
        },
        // 格式化日期
        formatDate({ cellValue }) {
            return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
        },
        showTooltipMethod({ type, column, row, items, _columnIndex }) {
            const { property } = column;
            // 重写默认的提示内容
            if (property === 'name' || property === 'date') {
                if (type === 'header') {
                    return column.title ? '自定义标题提示内容：' + column.title : '';
                } else if (type === 'footer') {
                    return items[_columnIndex] ? '自定义表尾提示内容，\n并且自定义换行：\n' + items[_columnIndex] : '';
                }
                return row[property]
                    ? property === 'date'
                        ? '时间日期为：' + XEUtils.toDateString(row[property], 'yyyy-MM-dd HH:ss:mm')
                        : row[property]
                    : '';
            } else if (property === 'rate') {
                // 返回空字符串，控制单元格不显示提示内容
                return '';
            }
            // 其余的单元格使用默认行为
            return null;
        }
    }
};
</script>

<style lang="scss" scoped>
.user-manage-page {
    .vxe-table {
        margin-top: 20px;
        h1 {
            margin-bottom: 20px;
        }
    }
}
</style>

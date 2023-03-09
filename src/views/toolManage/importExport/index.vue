<template>
    <div class="maintain-apply-form w-10/12 mx-auto mt-20">
        <div class="title-wrap">
            <div>分类维护申请单</div>
            <i class="el-icon-question"></i>
        </div>
        <div class="table-wrap">
            <div class="form-wrap">
                <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="90px">
                    <el-form-item label="维护类型" prop="maintainType">
                        <el-radio-group v-model="applyForm.maintainType">
                            <el-radio v-for="item in maintainTypeList" :key="item.id" :label="item.id">{{
                                item.name
                            }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <template v-if="applyForm.maintainType === 1">
                    <el-table
                        :data="newClassificationData"
                        border
                        style="width: 96%; margin: 0 auto"
                        max-height="500"
                        header-align="center"
                        :cell-style="{ borderColor: '#000' }"
                        :header-cell-style="{ borderColor: '#000', padding: '5px 0' }"
                    >
                        <template v-for="columnItem in newClassificationColumns">
                            <el-table-column :prop="columnItem.prop" :label="columnItem.label" :key="columnItem.prop">
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
                <template v-else-if="applyForm.maintainType === 2">
                    <el-table
                        :data="maintainClassificationData"
                        border
                        style="width: 96%; margin: 0 auto"
                        max-height="500"
                        header-align="center"
                        :cell-style="{ borderColor: '#000' }"
                        :header-cell-style="{ borderColor: '#000', padding: '5px 0' }"
                        :header-cell-class-name="headerCellClassName"
                    >
                        <template v-for="columnItem in maintainClassificationColumns">
                            <el-table-column
                                :prop="columnItem.prop"
                                :label="columnItem.label"
                                :key="columnItem.prop"
                                :width="columnItem.width"
                                :fixed="columnItem.prop === 'beforeChange'"
                            >
                                <template slot-scope="scope">
                                    <div :style="{ color: columnItem.color }">
                                        {{ scope.row[columnItem.prop] }}
                                    </div>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
                <template v-else-if="applyForm.maintainType === 3">
                    <el-table
                        :data="deleteClassificationData"
                        border
                        style="width: 96%; margin: 0 auto"
                        max-height="500"
                        header-align="center"
                        :cell-style="{ borderColor: '#000' }"
                        :header-cell-style="{ borderColor: '#000', padding: '5px 0' }"
                    >
                        <template v-for="columnItem in deleteClassificationColumns">
                            <el-table-column
                                :prop="columnItem.prop"
                                :label="columnItem.label"
                                :key="columnItem.prop"
                                width="150"
                            >
                            </el-table-column>
                        </template>
                    </el-table>
                </template>
            </div>
            <div class="button-wrap">
                <div class="required">*表示必填字段：</div>
                <div>
                    <el-button class="mr-12" size="mini" plain @click="handleDownloadTemplateBtn">模板下载</el-button>
                    <el-upload
                        class="upload-template mr-12"
                        action="#"
                        multiple
                        ref="uploadRef"
                        :http-request="uploadFile"
                        :limit="fileLimit"
                        :file-list="fileList"
                        :on-change="handleChange"
                        :on-exceed="handleExceed"
                        :before-upload="handleBeforeUpload"
                        :show-file-list="false"
                        :disabled="!applyForm.maintainType"
                    >
                        <el-button class="mr-1" type="primary" size="mini" :disabled="!applyForm.maintainType" plain
                            >数据上传</el-button
                        >
                    </el-upload>
                    <el-button ty size="mini" type="info" plain @click="handleFinishBtn">完成(F)</el-button>
                    <el-button size="mini" type="info" plain @click="handleCancelBtn">取消(C)</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { exportExcel } from '@/utils/exportExcel.js';
import XLSX from 'xlsx';

// 维护类型列表
const maintainTypeList = [
    {
        id: 1,
        name: '新建分类'
    },
    {
        id: 2,
        name: '维护分类'
    },
    {
        id: 3,
        name: '删除分类'
    }
];
export default {
    name: 'importExport',
    data() {
        return {
            loading: false,
            maintainTypeList,
            applyForm: {
                maintainType: undefined // 维护类型
            },
            // 新建分类列表
            newClassificationData: [
                {
                    fcNodeName: '', // 父分类节点名称
                    cNodeName: '', // 分类节点名称
                    cNodeAttrName: '', // 分类节点属性名称
                    isRequired: '', // 分类节点属性是否必填
                    attrDefault: '', // 分类属性默认值
                    cAttrScope: '' // 分类节点属性取值范围
                }
            ],
            // 维护分类
            maintainClassificationData: [
                {
                    beforeChange: '', // 变更前
                    beforeNodeName: '', // 变更前分类节点名称
                    beforeNodeAttrName: '', // 变更前分类节点属性名称
                    beforeIsRequired: '', // 变更前分类节点属性是否必填
                    beforeAttrDefault: '', // 变更前分类属性默认值
                    beforeAttrScope: '', // 变更前分类节点属性取值范围
                    afterChange: '', // 变更后
                    afterNodeName: '', // 变更后分类节点名称
                    afterNodeAttrName: '', // 变更后分类节点属性名称
                    afterIsRequired: '', // 变更后分类节点属性是否必填
                    afterAttrDefault: '', // 变更后分类属性默认值
                    afterAttrScope: '' // 变更后分类节点属性取值范围
                }
            ],
            // 删除分类列表
            deleteClassificationData: [{ cNodeName: '' }],
            rules: {
                maintainType: [{ required: true, trigger: 'change' }]
            },
            fileList: [], //上传后的文件列表
            fileType: ['xls', 'xlsx'], // 允许的文件类型
            fileSize: 50, // 运行上传文件大小，单位 M
            fileLimit: 1 // 附件数量限制
        };
    },
    computed: {
        // 新建分类表头
        newClassificationColumns() {
            return [
                { prop: 'fcNodeName', label: '父分类节点名称' },
                { prop: 'cNodeName', label: '分类节点名称' },
                { prop: 'cNodeAttrName', label: '分类节点属性名称' },
                { prop: 'isRequired', label: '分类节点属性是否必填' },
                { prop: 'cAttrDefault', label: '分类属性默认值' },
                { prop: 'cAttrScope', label: '分类节点属性取值范围' }
            ];
        },
        // 维护分类
        maintainClassificationColumns() {
            return [
                { prop: 'beforeChange', label: '变更前', width: 90, color: '#000' },
                { prop: 'beforeNodeName', label: '变更前分类节点名称', width: 120, color: '#000' },
                { prop: 'beforeNodeAttrName', label: '变更前分类节点属性名称', width: 140, color: '#000' },
                { prop: 'beforeIsRequired', label: '变更前分类节点属性是否必填', width: 180, color: '#000' },
                { prop: 'beforeAttrDefault', label: '变更前分类属性默认值', width: 160, color: '#000' },
                { prop: 'beforeAttrScope', label: '变更前分类节点属性取值范围', width: 200, color: '#000' },
                { prop: 'afterChange', label: '变更后', width: 90, color: '#ff0000' },
                { prop: 'afterNodeName', label: '变更后分类节点名称', width: 120, color: '#ff0000' },
                { prop: 'afterNodeAttrName', label: '变更后分类节点属性名称', width: 140, color: '#ff0000' },
                { prop: 'afterIsRequired', label: '变更后分类节点属性是否必填', width: 180, color: '#ff0000' },
                { prop: 'afterAttrDefault', label: '变更后分类属性默认值', width: 160, color: '#ff0000' },
                { prop: 'afterAttrScope', label: '变更后分类节点属性取值范围', width: 200, color: '#ff0000' }
            ];
        },
        // 删除分类表头
        deleteClassificationColumns() {
            return [{ prop: 'cNodeName', label: '分类节点名称' }];
        }
    },
    created() {},
    methods: {
        // 设置变更后表头样式
        headerCellClassName({ columnIndex }) {
            if (columnIndex >= 6) {
                return 'redColor';
            }
        },
        // // 处理导出数据
        // handleExportDataFormat(column, data, name) {
        //     const columns = column.filter(item => item.label);
        //     const sheetData = data.map(item => columns.map(columnItem => item[columnItem.prop]));
        //     const fileName = name;
        //     const optionCollection = {
        //         fileName: fileName,
        //         datas: [
        //             {
        //                 sheetHeader: columns.map(item => item.label),
        //                 sheetData: sheetData,
        //                 columnWidths: new Array(columns.length).fill(10)
        //             }
        //         ]
        //     };
        //     return { optionCollection };
        // },
        // // 处理模板下载按钮
        // handleDownloadTemplateBtn() {
        //     console.log('this.applyForm.maintainType： ', this.applyForm.maintainType);
        //     if (!this.applyForm.maintainType) {
        //         this.$message({
        //             type: 'warning',
        //             message: '请先选择维护类型！',
        //             center: true
        //         });
        //         return;
        //     }
        //     let option = {};
        //     if (this.applyForm.maintainType === 1) {
        //         let { optionCollection } = this.handleExportDataFormat(
        //             this.newClassificationColumns,
        //             this.newClassificationData,
        //             '分类节点新增'
        //         );
        //         option = optionCollection;
        //     } else if (this.applyForm.maintainType === 2) {
        //         const beforeColumns = this.beforelChangeClassificationColumns.filter(item => item.label);
        //         const afterColumns = this.afterChangeClassificationColumns.filter(item => item.label);
        //         const beforeSheetData = this.maintainCassificationCollection.beforelChangeClassificationData.map(item =>
        //             beforeColumns.map(columnItem => item[columnItem.prop])
        //         );
        //         const afterSheetData = this.maintainCassificationCollection.afterChangeClassificationData.map(item =>
        //             beforeColumns.map(columnItem => item[columnItem.prop])
        //         );
        //         const beforeOption = {
        //             sheetName: '维护分类变更前',
        //             sheetHeader: beforeColumns.map(item => item.label),
        //             sheetData: beforeSheetData,
        //             columnWidths: new Array(beforeColumns.length).fill(10)
        //         };
        //         const afterOption = {
        //             sheetName: '维护分类变更后',
        //             sheetHeader: afterColumns.map(item => item.label),
        //             sheetData: afterSheetData,
        //             columnWidths: new Array(afterColumns.length).fill(10)
        //         };
        //         option = {
        //             fileName: '分类节点维护',
        //             datas: [beforeOption, afterOption]
        //         };
        //     } else if (this.applyForm.maintainType === 3) {
        //         let { optionCollection } = this.handleExportDataFormat(
        //             this.deleteClassificationColumns,
        //             this.deleteClassificationData,
        //             '分类节点删除'
        //         );
        //         option = optionCollection;
        //     }
        //     const toExcel = new ExportExcel(option);
        //     toExcel.saveExcel();
        // },
        exportTemplateMap(type) {
            const templateType = {
                1: () => exportExcel(this.newClassificationData, this.newClassificationColumns, '分类节点新增'),
                2: () =>
                    exportExcel(this.maintainClassificationData, this.maintainClassificationColumns, '分类节点维护'),
                3: () => exportExcel(this.deleteClassificationData, this.deleteClassificationColumns, '分类节点删除')
            };
            if (templateType[type]) {
                templateType[type]();
            }
        },
        // 处理模板下载按钮
        handleDownloadTemplateBtn() {
            if (!this.applyForm.maintainType) {
                this.$message({
                    type: 'warning',
                    message: '请先选择维护类型！',
                    center: true
                });
                return;
            }
            this.exportTemplateMap(this.applyForm.maintainType);
        },
        excelDataToJson(sheetJson, columns) {
            if (!sheetJson.length) return;
            let result = sheetJson;
            // console.log('result: ', result);
            const excelNameToKey = {};
            columns.forEach(item => {
                excelNameToKey[item.label] = item.prop;
            });
            // console.log('excelNameToKey ', excelNameToKey);
            const tableData = [];
            result.forEach(item => {
                const newItem = {};
                Object.keys(item).forEach(key => {
                    newItem[excelNameToKey[key]] = item[key];
                });
                tableData.push(newItem);
            });
            return tableData;
        },
        // 读取对应表格文件
        readerExcel(file, type) {
            const fileReader = new FileReader();
            // 以二进制的方式读取表格内容
            fileReader.readAsBinaryString(file);
            // 表格内容读取完成
            fileReader.onload = event => {
                try {
                    const fileData = event.target.result;
                    const workbook = XLSX.read(fileData, {
                        type: 'binary'
                    });
                    // 表格是有序列表，因此可以取多个 Sheet，这里取第一个 Sheet
                    const wsname = workbook.SheetNames[0];
                    // 将表格内容生成 json 数据
                    const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
                    // console.log('sheetJson: ', sheetJson);
                    if (type === 1) {
                        const newClassificationData = this.excelDataToJson(sheetJson, this.newClassificationColumns);
                        this.newClassificationData = newClassificationData;
                    } else if (type === 2) {
                        const maintainClassificationData = this.excelDataToJson(
                            sheetJson,
                            this.maintainClassificationColumns
                        );
                        this.maintainClassificationData = maintainClassificationData;
                    } else if (type === 3) {
                        const deleteClassificationData = this.excelDataToJson(
                            sheetJson,
                            this.deleteClassificationColumns
                        );
                        this.deleteClassificationData = deleteClassificationData;
                    }
                    // 清空上传数据
                    this.fileList = [];
                    this.$message({
                        type: 'success',
                        message: '导入数据成功！',
                        center: true
                    });
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: '导入数据失败！',
                        center: true
                    });
                    return false;
                }
            };
        },
        // 处理数据上传按钮
        async uploadFile({ file }) {
            this.readerExcel(file, this.applyForm.maintainType);
        },
        handleBeforeUpload(file) {
            if (!file) return;
            const FileSuffix = file.name.replace(/.+\./, '').toLowerCase();
            const isLt50M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
            if (!isLt50M) {
                this.$message({
                    type: 'warning',
                    message: '上传文件大小不能超过 50MB!',
                    center: true
                });
                return false;
            }
            if (this.fileType.includes(FileSuffix)) {
                return true;
            } else {
                this.$message({
                    type: 'warning',
                    message: '上传文件格式不正确，仅允许xls, xlsx的文件格式',
                    center: true
                });
                return false;
            }
        },
        handleChange(file, fileList) {
            if (!fileList.length) {
                this.$message({
                    type: 'warning',
                    message: '请选取文件后再上传',
                    center: true
                });
                return;
            }
            this.fileList = fileList;
        },
        // 文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message({
                type: 'warning',
                message: `当前限制选择 ${this.fileLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                    files.length + fileList.length
                } 个文件`,
                center: true
            });
            return;
        },
        // 处理完成按钮
        handleFinishBtn() {},
        // 处理取消按钮
        handleCancelBtn() {}
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/element-scrollbar.scss';

.value1 {
    width: 125px;
    height: 30px;
    border: 1px solid #333;
}
.column1 {
    width: 40px;
    height: 30px;
    border: 1px solid #333;
}
.mr-12 {
    margin-right: 12px;
}
::v-deep .el-table .redColor {
    color: #ff0000 !important;
}
::v-deep .el-table .el-table__fixed {
    height: auto !important;
    position: absolute;
    top: 0;
    left: 0;
}
.maintain-apply-form {
    // width: 1100px;
    // margin: 50px auto;
    background: #f1f1f1;
    .title-wrap {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        border-top: 1px solid #bababa;
        border-bottom: 1px solid #bababa;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-icon-question {
            font-size: 20px;
            color: #6b93a9;
        }
    }
    .table-wrap {
        width: 100%;
        height: 100%;
        margin: 40px auto 0;
        padding-bottom: 10px;
        background: linear-gradient(to bottom, #eef6f9, #ccdde7);
        .form-wrap {
            box-sizing: border-box;
            width: 96%;
            min-height: 590px;
            margin: 0 auto;
            padding: 0px 5px 15px 5px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 3px 2px #9aa5b0;
            .el-form :deep(.el-form-item__content) {
                margin-left: 130px !important;
            }
            .el-table {
                border: 1px solid #000;
            }
        }
        .button-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 25px 0;
            padding: 0 14px 0 12px;
            .required::before {
                content: '*';
            }
            .upload-template {
                display: inline-block;
            }
        }
    }
}
</style>

const ExcelJS = require('exceljs');
const FileSaver = require('file-saver');

export const isNull = val => {
    return val === null || val === void 0 || val === '' || val.toString() === 'NaN';
};

/**
 * 导出excl
 * @param {*} tableData: 表格数据
 * @param {*} tableColumns 表格列
 * @param {*} fileName 导出文件名
 */
export const exportExcel = (tableData, tableColumns, fileName) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    //创建工作簿
    const Sheet = workbook.addWorksheet(fileName, { properties: { tabColor: { argb: 'FFC0000' } } });
    //表头样式
    let columnsFont = { name: '宋体', size: 14, color: { argb: 'FFFFFFFF' } };
    // 单元格对齐方式
    let columnsAlignment = { vertical: 'middle', horizontal: 'center' };
    let columnsFill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
            argb: 'FF49b6c3'
        }
    };
    //给第一行设置样式，也就是表头样式
    Sheet.getRow(1).font = columnsFont;
    Sheet.getRow(1).alignment = columnsAlignment;
    Sheet.getRow(1).fill = columnsFill;
    // 生成columns
    let columns = [];
    tableColumns.map(item => {
        columns.push({
            name: item.label,
            key: item.prop
        });
    });
    // 设置列宽
    columns.forEach((item, i) => {
        Sheet.getColumn(i + 1).width = 36;
    });
    // console.log('columns: ', columns);
    // 生成rows
    let rows = [];
    tableData.map(item => {
        let arr = [];
        tableColumns.map(sub => {
            arr.push(!isNull(item[sub.prop]) ? item[sub.prop] : '');
        });
        rows.push(arr);
    });
    // console.log('rows: ', rows);
    Sheet.addTable({
        name: 'MyTable',
        ref: 'A1', // 表格左上角的位置
        headerRow: true,
        totalsRow: false,
        // style: {
        //     theme: 'TableStyleLight1'
        // },
        columns: columns,
        rows: rows
    });
    //最后导出excel,fileName为导出的文件名字
    workbook.xlsx.writeBuffer().then(buffer => {
        FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName + `.xlsx`);
    });
};

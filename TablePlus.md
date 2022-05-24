# TablePlus

## rowKey

行数据唯一标识，默认 'id'，必须为有效值

## rowEditable

是否启用双击编辑，默认启用

## rowSortable

是否启用行排序，默认不启用

## initialRowModel

新增或新增子项时的初始字段

## showAddBtn

是否显示新增按钮，默认显示

## showAddChildBtn

是否显示新增子项按钮，默认显示

## showRemoveBtn

是否显示移除按钮，默认显示

## showSearchBar

是否显示搜索框，默认显示

## showFilterBar

是否显示过滤框，默认显示

## columns

| prop           | 说明                                                | 默认值 |
| -------------- | --------------------------------------------------- | ------ |
| sortable       | 是否启用排序                                        | true   |
| slotProp       | slot 字段名                                         | -      |
| editable       | 是否启用编辑                                        | False  |
| editProps      | 编辑配置                                            | -      |
| editProps.type | 编辑器类型<br />input<br />select<br />switch<br /> | Input  |
| formatter      | 字段格式化 Function(row)                            | -      |

## ## custom-btns

自定义按钮

```js
[
        {
          label: '自定义按钮',
          onClick: (selections) => {
            const names = selections.filter((item) => item.name).map((item) => item.name)
            if (names.length) {
              Message.info(`选中了${names.join('、')}`)
            }
          }
        }
      ]
```

## @row-remove

行移除事件

## @row-edit-value-change

行编辑值修改事件
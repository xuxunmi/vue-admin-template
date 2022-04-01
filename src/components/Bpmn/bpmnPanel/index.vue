<template>
    <div class="bpmn-panel-page">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
            <el-tab-pane label="节点属性" name="node">
                <node-property-panel
                    v-if="activeName == 'node'"
                    :modeler="modeler"
                    :nodeElement="nodeElement"
                    :formData="formData"
                    @modifyFormData="modifyFormData"
                ></node-property-panel>
            </el-tab-pane>
            <el-tab-pane label="流程属性" name="process">
                <process-property-panel
                    v-if="activeName == 'process'"
                    :modeler="modeler"
                    :processData="process"
                    :element="element"
                ></process-property-panel>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import nodePropertyPanel from './NodePropertyPanel';
import processPropertyPanel from './ProcessPropertyPanel';

export default {
    name: 'bpmnPanel',
    components: {
        nodePropertyPanel,
        processPropertyPanel
    },
    props: {
        modeler: {
            type: Object,
            default: () => {},
            required: true
        },
        process: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data() {
        return {
            activeName: 'node',
            element: null,
            nodeElement: {},
            formData: {}
        };
    },
    mounted() {
        this.handleModeler();
    },
    methods: {
        handleClick(tab) {
            // console.log(tab);
            this.activeName = tab.paneName;
        },
        isImplicitRoot(element) {
            return element.id === '__implicitroot';
        },
        handleModeler() {
            // const _this = this;
            this.modeler.on('root.added', e => {
                let element = e.element;
                if (this.isImplicitRoot(element)) return;
                this.element = element;
                // console.log('this.element: ', this.element);
            });
            // 发生任意可撤销/恢复操作时触发，可用来实时更新xml
            this.modeler.on('commandStack.changed', () => {
                try {
                    const result = this.modeler.saveXML();
                    const { xml } = result;
                    if (xml) {
                        this.$emit('updateXml', xml);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
            // 监听选中元素变化时，返回新选中的元素对象
            this.modeler.on('selection.changed', e => {
                const element = e.newSelection[0];
                if (!element) return;
                this.handleFormData(element);
            });
            // 监听元素发生改变并更改完成
            this.modeler.on('element.changed', e => {
                const { element } = e;
                if (!element) return;
                this.handleFormData(element);
            });
            // 监听元素单击事件
            this.modeler.on('element.click', e => {
                const { element } = e;
                this.handleFormData(element);
            });
        },
        handleFormData(element) {
            // console.log('element: ', element);
            if (!element.id) return;
            let businessObject = element.businessObject;
            this.formData = {
                type: element.type,
                ...element.businessObject,
                ...element.businessObject.$attrs,
                userType: businessObject.$attrs.userType,
                candidateUsers: businessObject.$attrs.candidateUsers
                    ? businessObject.$attrs.candidateUsers.split(',')
                    : [],
                sequenceFlow: businessObject.conditionExpression ? businessObject.conditionExpression.body : ''
            };
            // console.log('this.formData: ', this.formData);
            this.nodeElement = element;
            // console.log('this.nodeElement: ', this.nodeElement);
        },
        modifyFormData(data) {
            console.log('data: ', data);
            this.formData.assignee = data.assignee;
            this.formData.userType = data.userType;
        }
    }
};
</script>

<style lang="scss" scoped>
.bpmn-panel-page {
    width: 275px;
    border: 1px solid #eeeeee;
    padding: 0 5px;
}
</style>

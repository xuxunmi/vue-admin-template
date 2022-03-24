<template>
    <div class="bpmn-panel">
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
import nodePropertyPanel from './NodePropertyPanel.vue';
import processPropertyPanel from './ProcessPropertyPanel.vue';

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
            // this.modeler.on('commandStack.changed', () => {
            //     _this.modeler.saveXML({ format: true }, function (err, xml) {
            //         _this.$emit('updateXml', xml);
            //     });
            // });
            // 流程元素选中事件
            this.modeler.on('selection.changed', e => {
                const element = e.newSelection[0];
                if (!element) return;
                this.modifyActiveName(element);
                this.handleFormData(element);
            });
            // 流程元素改变事件
            this.modeler.on('element.changed', e => {
                const { element } = e;
                if (!element) {
                    return;
                }
                this.handleFormData(element);
            });
            // 流程元素点击事件
            this.modeler.on('element.click', e => {
                const { element } = e;
                if (element.type == this.modeler._definitions.rootElements[0].$type) {
                    this.modifyActiveName(0);
                } else {
                    this.modifyActiveName(1);
                    if (element.type == 'bpmn:UserTask') {
                        let _businessObject = element.businessObject;
                        if (_businessObject.assignee) {
                            this.formData.userType = 'assignee';
                            this.formData.assignee = _businessObject.assignee;
                        }
                    }
                }
            });
        },
        modifyActiveName(element) {
            let activeName = 'node';
            if (!element) {
                activeName = 'process';
            }
            this.activeName = activeName;
        },
        handleFormData(element) {
            // console.log('element: ', element);
            if (!element.id) return;
            let { businessObject } = element;
            this.formData = {
                nodeType: element.type,
                nodeId: businessObject.id,
                nodeName: businessObject.name,
                candidateGroups: businessObject.$attrs.candidateGroups,
                sequenceFlow: businessObject.conditionExpression ? businessObject.conditionExpression.body : '',
                userType: businessObject.$attrs.userType,
                assignee: businessObject.$attrs.assignee,
                candidateUsers: businessObject.$attrs.candidateUsers
                    ? businessObject.$attrs.candidateUsers.split(',')
                    : []
            };
            // console.log('this.formData: ', this.formData);
            this.nodeElement = element;
            // console.log('this.nodeElement: ', this.nodeElement);
        },
        modifyFormData(data) {
            this.formData.assignee = data.assignee;
            this.formData.userType = data.userType;
        }
    }
};
</script>

<style lang="scss" scoped>
.bpmn-panel {
    width: 275px;
    border: 1px solid #eeeeee;
    padding: 0 5px;
}
</style>

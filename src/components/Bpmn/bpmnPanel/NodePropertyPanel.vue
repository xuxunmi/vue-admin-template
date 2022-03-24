<template>
    <div class="node-panel-page">
        <el-form ref="localNodeFormData" :model="localNodeFormData" label-width="90px">
            <el-form-item label="节点类型：">
                <el-input size="small" v-model="localNodeFormData.nodeType" disabled></el-input>
            </el-form-item>
            <el-form-item label="节点ID：">
                <el-input size="small" v-model="localNodeFormData.nodeId" @input="updateNodeId"></el-input>
            </el-form-item>
            <el-form-item label="节点名称：">
                <el-input size="small" v-model="localNodeFormData.nodeName" @input="updateNodeName"></el-input>
            </el-form-item>
            <el-form-item
                label="角色/岗位："
                v-if="localNodeFormData.nodeType == 'bpmn:UserTask' && localNodeFormData.userType === 'candidateGroups'"
            >
                <el-select
                    v-model="localNodeFormData.candidateGroups"
                    placeholder="请选择"
                    @change="value => addUser({ candidateGroups: value })"
                >
                    <el-option
                        v-for="item in rolesList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="localNodeFormData.type == 'bpmn:SequenceFlow'" label="分支条件：">
                <el-input v-model="localNodeFormData.sequenceFlow" @input="updateSequenceFlow"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'nodePropertyPanel',
    props: {
        modeler: {
            type: Object,
            default: () => {},
            required: true
        },
        nodeElement: {
            type: Object,
            default: () => {},
            required: true
        },
        formData: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data() {
        return {
            // localNodeFormData: {
            //     // 节点类型
            //     nodeType: '',
            //     // 节点ID
            //     nodeId: '',
            //     //节点名称
            //     nodeName: '',
            //     // 角色/岗位
            //     candidateGroups: '',
            //     // 分支条件
            //     sequenceFlow: ''
            // },
            rolesList: [
                {
                    value: 'manager',
                    label: '经理'
                },
                {
                    value: 'personnel',
                    label: '人事'
                },
                {
                    value: 'charge',
                    label: '主管'
                }
            ]
        };
    },
    watch: {
        nodeElement: {
            handler() {
                if (this.nodeElement.type == 'bpmn:StartEvent') {
                    this.updateNodeName('开始');
                }
                if (this.nodeElement.type == 'bpmn:EndEvent') {
                    this.updateNodeName('结束');
                }
            }
        }
    },
    computed: {
        localNodeFormData() {
            return this.formData;
        }
    },
    methods: {
        updateProperties(properties) {
            this.modeler.get('modeling').updateProperties(this.nodeElement, properties);
        },
        // 更新nodeId
        updateNodeId(name) {
            this.updateProperties({ id: name });
        },
        // 更新节点名称
        updateNodeName(name) {
            this.updateProperties({ name: name });
        },
        updateSequenceFlow(val) {
            let newCondition = this.modeler.get('moddle').create('bpmn:FormalExpression', {
                body: val
            });
            this.updateProperties({ conditionExpression: newCondition });
        },
        addUser(properties) {
            this.updateProperties(properties);
            Object.assign(properties, {
                userType: Object.keys(properties)[0]
            });
            this.$emit('modifyFormData', properties);
        }
    }
};
</script>

<style lang="scss" scoped></style>

<template>
    <div class="node-panel-page">
        <el-form ref="localNodeFormData" :model="localNodeFormData" label-width="90px">
            <el-form-item label="节点类型：">
                <el-input size="mini" v-model="localNodeFormData.type" disabled></el-input>
            </el-form-item>
            <el-form-item label="节点ID：">
                <el-input size="mini" v-model="localNodeFormData.id" @input="updateId"></el-input>
            </el-form-item>
            <el-form-item label="节点名称：">
                <el-input size="mini" v-model="localNodeFormData.name" @input="updateName"></el-input>
            </el-form-item>
            <el-form-item label="节点人员：" v-if="userTask">
                <el-select
                    size="mini"
                    v-model="localNodeFormData.userType"
                    placeholder="请选择"
                    @change="changeUserType"
                >
                    <el-option
                        v-for="item in nodePersonnelList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="指定人员：" v-if="userTask && localNodeFormData.userType === 'assignee'">
                <el-select
                    size="mini"
                    v-model="localNodeFormData.assignee"
                    placeholder="请选择"
                    key="1"
                    @change="value => addUser({ assignee: value })"
                >
                    <el-option
                        v-for="item in assigneesList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="候选人员：" v-else-if="userTask && localNodeFormData.userType === 'candidateUsers'">
                <el-select
                    size="mini"
                    v-model="localNodeFormData.candidateUsers"
                    placeholder="请选择"
                    key="2"
                    multiple
                    @change="value => addUser({ candidateUsers: value.join(',') || value })"
                >
                    <el-option
                        v-for="item in candidateUsersList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色/岗位：" v-else-if="userTask && localNodeFormData.userType === 'candidateGroups'">
                <el-select
                    size="mini"
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
            <el-form-item v-if="sequenceFlow" label="分支条件：">
                <el-input size="mini" v-model="localNodeFormData.sequenceFlow" @input="updateSequenceFlow"></el-input>
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
            default: () => {}
        },
        formData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            // localNodeFormData: {
            //     // 节点类型
            //     type: '',
            //     // 节点ID
            //     id: '',
            //     //节点名称
            //     name: '',
            //     //节点人员
            //     userType: '',
            //     //指定人员
            //     assignee: '',
            //     //候选人员
            //     candidateUsers: '',
            //     // 角色/岗位
            //     candidateGroups: '',
            //     // 分支条件
            //     sequenceFlow: ''
            // },
            // 节点人员列表
            nodePersonnelList: [
                {
                    value: 'assignee',
                    label: '指定人员'
                },
                {
                    value: 'candidateUsers',
                    label: '候选人员'
                },
                {
                    value: 'candidateGroups',
                    label: '角色/岗位'
                }
            ],
            // 指定人员列表
            assigneesList: [
                {
                    value: '1001',
                    label: '张三'
                },
                {
                    value: '1002',
                    label: '李四'
                },
                {
                    value: '1003',
                    label: '王五'
                }
            ],
            // 候选人列表
            candidateUsersList: [
                {
                    value: '1001',
                    label: '张三'
                },
                {
                    value: '1002',
                    label: '李四'
                },
                {
                    value: '1003',
                    label: '王五'
                }
            ],
            // 角色/岗位列表
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
                    this.updateName('开始');
                }
                if (this.nodeElement.type == 'bpmn:EndEvent') {
                    this.updateName('结束');
                }
            }
        }
    },
    computed: {
        localNodeFormData: {
            get() {
                console.log('this.formData99999: ', this.formData);
                return this.formData;
            }
        },
        userTask() {
            if (!this.nodeElement) return;
            return this.nodeElement.type === 'bpmn:Task';
        },
        sequenceFlow() {
            if (!this.nodeElement) return;
            return this.nodeElement.type === 'bpmn:SequenceFlow';
        }
    },
    methods: {
        updateProperties(properties) {
            this.modeler.get('modeling').updateProperties(this.nodeElement, properties);
        },
        // 更新id
        updateId(id) {
            this.updateProperties({ id });
        },
        // 更新节点名称
        updateName(name) {
            this.updateProperties({ name });
        },
        // 选择节点人员
        changeUserType(val) {
            this.updateProperties({ userType: val });
        },
        // 更新分支条件
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

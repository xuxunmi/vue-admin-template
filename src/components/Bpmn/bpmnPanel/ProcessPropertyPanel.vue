<template>
    <div class="process-panel-page">
        <el-form ref="localProcessFormData" :model="localProcessFormData" label-width="90px">
            <el-form-item label="流程ID：">
                <el-input size="mini" v-model="localProcessFormData.key" @input="updateId"></el-input>
            </el-form-item>
            <el-form-item label="流程名称：">
                <el-input size="mini" v-model="localProcessFormData.name" @input="updateName"></el-input>
            </el-form-item>
            <el-form-item label="流程描述：">
                <el-input size="mini" v-model="localProcessFormData.descriptor" @input="updateDescriptor"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'processPropertyPanel',
    props: {
        processData: {
            type: Object,
            default: () => {}
        },
        modeler: {
            type: Object,
            default: () => {}
        },
        element: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {};
    },
    computed: {
        localProcessFormData() {
            return this.processData;
        }
    },
    methods: {
        updateId(id) {
            this.modeler.get('modeling').updateProperties(this.element, { id });
        },
        updateName(name) {
            this.modeler.get('modeling').updateProperties(this.element, { name });
        },
        updateDescriptor(desc) {
            let doc = this.modeler.get('bpmnFactory').create('bpmn:Documentation', { text: desc });
            this.modeler.get('modeling').updateProperties(this.element, { documentation: [doc] });
        }
    }
};
</script>

<style lang="scss" scoped></style>

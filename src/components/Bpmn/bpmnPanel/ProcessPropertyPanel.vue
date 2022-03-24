<template>
    <div class="process-panel-page">
        <el-form ref="localProcessFormData" :model="localProcessFormData" label-width="90px">
            <el-form-item label="流程ID">
                <el-input v-model="localProcessFormData.key" @input="updateId"></el-input>
            </el-form-item>
            <el-form-item label="流程名称">
                <el-input v-model="localProcessFormData.name" @input="updateName"></el-input>
            </el-form-item>
            <el-form-item label="流程描述">
                <el-input v-model="localProcessFormData.description" @input="updateDesc"></el-input>
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
            default: () => {},
            required: true
        },
        modeler: {
            type: Object,
            default: () => {},
            required: true
        },
        element: {
            type: Object,
            default: () => {},
            required: true
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
        updateId(name) {
            this.modeler.get('modeling').updateProperties(this.element, { id: name });
        },
        updateName(name) {
            this.modeler.get('modeling').updateProperties(this.element, { name: name });
        },
        updateDesc(name) {
            let doc = this.modeler.get('bpmnFactory').create('bpmn:Documentation', { text: name });
            this.modeler.get('modeling').updateProperties(this.element, { documentation: [doc] });
        }
    }
};
</script>

<style lang="scss" scoped></style>

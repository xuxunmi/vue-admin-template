<template>
    <div class="design-page">
        <div class="toolbar">
            <el-button type="primary" size="small" @click="handleAddProcess">添加流程</el-button>
        </div>
        <div class="design-table">
            <el-table :data="processData" style="width: 100%;" header-align="center">
                <el-table-column prop="processId" label="流程定义ID" align="center"> </el-table-column>
                <el-table-column prop="name" label="流程名称" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" fixed="right"> </el-table-column>
            </el-table>
        </div>
        <!-- 流程设计弹窗 -->
        <dialog-frame :title="'流程图'" :show.sync="dialogProcessDesignVisible" width="90%" :footer="false">
            <vue-bpmn
                style="overflow: hidden; width: 100%; height: 750px;"
                product="flowable"
                @processSave="processSave"
            ></vue-bpmn>
        </dialog-frame>
    </div>
</template>

<script>
import dialogFrame from '@/components/DialogFrame/index.vue';
import VueBpmn from '@/components/Bpmn/vue-bpmn.vue';
export default {
    name: 'design',
    components: {
        dialogFrame,
        VueBpmn
    },
    data() {
        return {
            dialogProcessDesignVisible: false,
            // 流程数据
            processData: []
        };
    },
    methods: {
        handleAddProcess() {
            this.dialogProcessDesignVisible = true;
        },
        processSave(data) {
            console.log('data:', data);
            // let that = this;
            // that.post(this.Apis.processBuffer, data, res => {
            // if (res.code == 200) {
            //     that.$refs.elementTable.reload();
            // }
            // });
        }
    }
};
</script>

<style lang="scss" scoped>
// 流程设计器全局样式
@import url('../../../components/Bpmn/css/vue-bmpn.css');
.design-table {
    margin-top: 30px;
}
</style>

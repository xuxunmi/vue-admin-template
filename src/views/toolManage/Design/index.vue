<template>
    <div class="design-page w-full h-full overflow-hidden px-8" :class="{ 'pt-16': tagsList.length }">
        <div class="toolbar">
            <el-button type="primary" size="small" @click="handleAddProcess">添加新流程</el-button>
        </div>
        <div class="mt-4">
            <el-table border :data="processData" style="width: 100%" header-align="center">
                <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
                <el-table-column prop="processId" label="流程定义ID" align="center"> </el-table-column>
                <el-table-column prop="name" label="流程名称" align="center"> </el-table-column>
                <!-- <el-table-column label="操作" align="center" fixed="right"> </el-table-column> -->
            </el-table>
        </div>
        <!-- 流程设计弹窗 -->
        <dialog-frame :title="'流程图'" :show.sync="dialogProcessDesignVisible" width="90%" :footer="false">
            <vue-bpmn
                style="overflow: hidden; width: 100%; height: 750px"
                :show.sync="dialogProcessDesignVisible"
                product="flowable"
                @processSaveData="processSaveData(arguments)"
            ></vue-bpmn>
        </dialog-frame>
    </div>
</template>

<script>
import dialogFrame from '@/components/DialogFrame/index.vue';
import VueBpmn from '@/components/Bpmn/vue-bpmn.vue';
import { mapState } from 'vuex';

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
    computed: {
        ...mapState(['tagsList'])
    },
    methods: {
        handleAddProcess() {
            this.dialogProcessDesignVisible = true;
        },
        processSaveData(values) {
            console.log('values:', values);
            const [data, val] = values;
            this.processData.push(data);
            // 关闭弹窗
            this.dialogProcessDesignVisible = val;
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
</style>

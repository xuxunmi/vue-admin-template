<template>
    <div class="bpmn-header-page">
        <el-button-group>
            <el-tooltip class="item" effect="dark" content="保存BPMN" placement="bottom">
                <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadBPMN">保存BPMN</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载SVG图片" placement="bottom">
                <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadSvg">保存SVG</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存草稿" placement="bottom">
                <el-button type="primary" size="mini" @click="saveProcessDraft">保存草稿</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导入BPMN文件" placement="bottom">
                <el-button type="primary" size="mini" icon="el-icon-upload2"
                    ><el-upload
                        ref="uploadBpmn"
                        style="display: inline-block; width: 100%; height: 100%; color: #fff;"
                        action="#"
                        :before-upload="openBpmn"
                        >导入BPMN</el-upload
                    ></el-button
                >
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="创建新流程图" placement="bottom">
                <el-button size="mini" icon="el-icon-circle-plus-outline" @click="createNewProcess"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
                <el-button size="mini" icon="el-icon-refresh-left" @click="handleUndo"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="恢复" placement="bottom">
                <el-button
                    size="mini"
                    icon="el-icon-refresh-right"
                    :class="!canRedo ? 'default-undo' : ''"
                    :disabled="!canRedo"
                    @click="handleRedo"
                ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
                <el-button size="mini" icon="el-icon-zoom-in" @click="handleZoom(0.1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
                <el-button size="mini" icon="el-icon-zoom-out" @click="handleZoom(-0.1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
                <el-button size="mini" icon="el-icon-refresh" @click="handleZoom(0)"></el-button>
            </el-tooltip>
        </el-button-group>
    </div>
</template>

<script>
export default {
    name: 'bpmnHeader',
    data() {
        return {
            // 流程图默认缩放值
            scale: 1.0,
            canRedo: false
        };
    },
    props: {
        processData: {
            type: Object
        },
        modeler: {
            type: Object
        }
    },
    mounted() {},
    methods: {
        // 保存BPMN
        downloadBPMN() {
            this.$emit('handleExportBpmn');
        },
        // 保存svg图片
        downloadSvg() {
            this.$emit('handleExportSvg');
        },
        // 保存草稿
        async saveProcessDraft() {
            let xmlData = await new Promise(resovle => {
                try {
                    const result = this.modeler.saveXML();
                    resovle(result);
                } catch (err) {
                    console.log(err);
                }
            }).catch(err => {
                console.log(err);
            });
            let svgData = await new Promise(resovle => {
                try {
                    const result = this.modeler.saveSVG();
                    resovle(result);
                } catch (err) {
                    console.log(err);
                }
            }).catch(err => {
                console.log(err);
            });
            Promise.all([xmlData, svgData]).then(result => {
                let [_xmlData, _svgData] = result;
                let data = {
                    xmlStr: _xmlData.xml,
                    svgStr: _svgData.svg
                };
                // console.log('data: ', data);
                this.$emit('handleSaveProcessDraft', data);
            });
        },
        // 导入BPMN文件
        openBpmn(file) {
            const reader = new FileReader();
            // 读取File对象中的文本信息，编码格式为UTF-8
            reader.readAsText(file, 'utf-8');
            reader.onload = () => {
                console.log(reader.result);
                //读取完毕后将文本信息导入到Bpmn建模器
                // this.createNewDiagram(reader.result);
                this.$emit('handleImportBpmn', reader.result);
            };
            return false;
        },
        // 创建新流程
        createNewProcess() {
            this.$emit('handleCreateNewProcess');
        },
        // 处理撤销
        handleUndo() {
            this.modeler.get('commandStack').undo();
            this.canRedo = this.modeler.get('commandStack').canRedo();
        },
        // 处理恢复
        handleRedo() {
            if (!this.canRedo) {
                return;
            }
            this.modeler.get('commandStack').redo();
            this.canRedo = this.modeler.get('commandStack').canRedo();
        },
        // 处理放大/缩小/重置
        handleZoom(val) {
            let newScale = !val ? 1.0 : this.scale + val;
            this.modeler.get('canvas').zoom(newScale);
            this.scale = newScale;
        }
    }
};
</script>

<style scoped></style>

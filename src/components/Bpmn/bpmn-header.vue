<template>
    <div class="bpmn-header-page">
        <el-button-group>
            <el-tooltip class="item" effect="dark" content="保存BPMN文件" placement="bottom">
                <el-button type="primary" size="mini" @click="downloadBPMN">
                    <i class="iconfont icon-xiazai"></i>
                    保存BPMN
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载SVG图片" placement="bottom">
                <el-button type="primary" size="mini" @click="downloadSvg">
                    <i class="iconfont icon-xiazai"></i>
                    保存SVG
                </el-button>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                content="导入BPMN文件"
                placement="bottom"
                style="position: absolute; top: 2px; left: 229.5px;"
            >
                <el-upload
                    ref="uploadBpmn"
                    style="display: inline-block; height: 32px;"
                    action="#"
                    accept=".xml, .bpmn"
                    :before-upload="uploadBpmn"
                >
                    <el-button type="primary" size="mini" style="border-radius: 0;">
                        <i class="iconfont icon-daoru"></i>
                        导入BPMN
                    </el-button>
                </el-upload>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存草稿" placement="bottom">
                <el-button type="primary" size="mini" style="margin-left: 110px;" @click="saveProcessDraft">
                    <i class="iconfont icon-baocun"></i>
                    保存草稿
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
                <el-button type="primary" size="mini" @click="saveProcess">
                    <i class="iconfont icon-baocun"></i>
                    保存
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="创建新流程图" placement="bottom">
                <el-button size="mini" @click="createNewProcess">
                    <i class="iconfont icon-tianjia"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
                <el-button size="mini" @click="handleUndo">
                    <i class="iconfont icon-undo1"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="恢复" placement="bottom">
                <el-button size="mini" @click="handleRedo" :disabled="!canRedo">
                    <i class="iconfont icon-redo1" :class="!canRedo ? 'default-undo' : ''"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="放大" placement="bottom">
                <el-button size="mini" @click="handleZoom(0.25)">
                    <i class="iconfont icon-fangda"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="缩小" placement="bottom">
                <el-button size="mini" @click="handleZoom(-0.25)">
                    <i class="iconfont icon-suoxiao"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
                <el-button size="mini" @click="handleZoom(0)">
                    <i class="iconfont icon-zhongzhi1"></i>
                </el-button>
            </el-tooltip>
        </el-button-group>
    </div>
</template>

<script>
// 引入x2js
import X2JS from 'x2js';

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
            type: Object,
            default: () => {}
        },
        modeler: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        // 保存BPMN
        downloadBPMN() {
            this.$emit('handleExportBpmn');
        },
        // 保存svg图片
        downloadSvg() {
            this.$emit('handleExportSvg');
        },
        // 保存流程草稿
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
        // 处理保存
        async saveProcess() {
            try {
                // attributePrefix 重置默认属性前缀 _ => ''
                const newConvert = new X2JS({ attributePrefix: '' });
                const result = await this.modeler.saveXML({ format: true });
                const { xml } = result;
                // console.log('xml: ', xml);
                const { definitions } = newConvert.xml2js(xml);
                //encodeURIComponent解决中文乱码
                let url = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(definitions));
                //通过创建a标签实现
                let link = document.createElement('a');
                link.href = url;
                //对下载的文件命名
                link.download = '临时数据.json';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('definitions: ', JSON.stringify(definitions));

                // let data = {
                //     xmlStr: xml
                // };
                // console.log('data111: ', data);
                // this.$emit('handleSaveProcess', data);
            } catch (err) {
                console.log(err);
            }
        },
        // 导入BPMN文件
        uploadBpmn(file) {
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

<style lang="scss" scoped>
.bpmn-header-page {
    position: relative;

    .default-undo {
        color: #c0c4cc;
    }
}
</style>

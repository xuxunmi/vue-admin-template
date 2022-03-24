<template>
    <div class="container">
        <div class="bpmn-viewer">
            <bpmn-header
                class="bpmn-viewer-header"
                :processData="initData"
                :modeler="bpmnModeler"
                @handleExportBpmn="handleExportBpmn"
                @handleExportSvg="handleExportSvg"
                @handleImportBpmn="handleImportBpmn"
                @handleSaveProcessDraft="handleSaveProcessDraft"
                @handleCreateNewProcess="handleCreateNewProcess"
            ></bpmn-header>
            <div class="bpmn-viewer-container">
                <div class="bpmn-viewer-content" ref="bpmnViewer"></div>
            </div>
        </div>
        <bpmn-panel v-if="bpmnModeler" :modeler="bpmnModeler" :process="initData"></bpmn-panel>
    </div>
</template>

<script>
import bpmnHeader from './bpmn-header.vue';
import bpmnPanel from './bpmnPanel/index.vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import templateXml from './data/templateXml';
import customTranslate from './data/customTranslate';
import activitiModele from './data/activiti.json';
import flowableModdle from './data/flowable.json';
export default {
    name: 'VueBpmn',
    props: {
        product: String
    },
    components: {
        'bpmn-header': bpmnHeader,
        'bpmn-panel': bpmnPanel
    },
    data() {
        return {
            // Bpmn对象
            bpmnModeler: null,
            initTemplate: '',
            // 右侧流程属性数据
            initData: {}
        };
    },
    mounted() {
        let processId = new Date().getTime();
        this.initTemplate = templateXml.initTemplate(processId);
        this.initData = { key: 'process' + processId, name: '流程' + processId, xml: this.initTemplate };
        this.init();
    },
    methods: {
        init() {
            // // 支持activiti和flowable
            let _moddleExtensions = this.getModdleExtensions();
            // 获取画布 element
            this.canvas = this.$refs.bpmnViewer;
            // 将汉化包装成一个模块
            const customTranslateModule = {
                translate: ['value', customTranslate]
            };
            // 创建Bpmn对象
            this.bpmnModeler = new BpmnModeler({
                container: this.canvas,
                additionalModules: [
                    // 汉化模块
                    customTranslateModule
                ],
                moddleExtensions: _moddleExtensions
            });
            // 初始化建模器内容
            this.createNewDiagram(this.initTemplate);
        },
        async createNewDiagram(xml) {
            // this.bpmnModeler.importXML(xml, err => {
            //     if (err) {
            //         this.$message({
            //             type: 'error',
            //             message: '打开模型出错,请确认该模型符合Bpmn2.0规范',
            //             center: true
            //         });
            //         return;
            //     }
            //     // let _tag = document.getElementsByTagName('svg')[0];
            //     // if (_tag) {
            //     //     _tag.style.width = '100%';
            //     //     _tag.style.height = '750px';
            //     // }
            // });
            try {
                const result = await this.bpmnModeler.importXML(xml);
                const { warnings } = result;
                console.log(warnings);
            } catch (error) {
                if (error) {
                    this.$message({
                        type: 'error',
                        message: '打开模型出错,请确认该模型符合Bpmn2.0规范',
                        center: true
                    });
                    return;
                }
                console.log(error.message, error.warnings);
            }
        },
        setEncoded(type, data) {
            const encodedData = encodeURIComponent(data);
            if (data) {
                if (type === 'XML') {
                    return {
                        filename: 'diagram.bpmn20.xml',
                        href: 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                        data
                    };
                }
                if (type === 'BPMN') {
                    return {
                        filename: 'diagram.bpmn',
                        href: 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                        data
                    };
                }
                if (type === 'SVG') {
                    this.initData.svg = data;
                    return {
                        filename: 'diagram.svg',
                        href: 'data:application/text/xml;charset=UTF-8,' + encodedData,
                        data
                    };
                }
            }
        },
        // 下载
        download({ filename, href, data }) {
            // console.log('filename: ', filename);
            // console.log('href: ', href);
            // console.log('data: ', data);
            const link = document.createElement('a');
            if (data) {
                link.href = href;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 0);
            }
        },
        // 获取文件名
        getFileName(xml) {
            let start = xml.indexOf('process');
            let filename = xml.substr(start, xml.indexOf('>'));
            filename = filename.substr(filename.indexOf('id') + 4);
            filename = filename.substr(0, filename.indexOf('"'));
            return filename;
        },
        // 处理保存BPMN
        handleExportBpmn() {
            this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                if (err) return console.error(err);
                // 获取文件名
                const { filename, href, data } = this.setEncoded('BPMN', xml);
                this.download({ filename, href, data });
            });
        },
        // 处理保存svg图片
        handleExportSvg() {
            this.bpmnModeler.saveSVG({ format: true }, (err, svg) => {
                if (err) return console.error(err);
                const { filename, href, data } = this.setEncoded('SVG', svg);
                // console.log('filename: ', filename);
                // console.log('href: ', href);
                // console.log('data: ', data);
                this.download({ filename, href, data });
            });
        },
        // 处理导入BPMN文件
        handleImportBpmn(data) {
            this.createNewDiagram(data);
        },
        // 处理保存草稿
        handleSaveProcessDraft(data) {
            // console.log('data: ', data);
            let initData = this.initData;
            data.procId = initData.key;
            data.name = initData.name;
            this.$emit('processSave', data);
        },
        // 处理创建新流程
        handleCreateNewProcess() {
            let processId = new Date().getTime();
            this.initTemplate = templateXml.initTemplate(processId);
            this.initData = { key: 'process' + processId, name: '流程' + processId, xml: this.initTemplate };
            this.createNewDiagram(this.initTemplate);
        },
        getModdleExtensions() {
            let moddleExtensions = {};
            if (this.product == 'flowable') {
                moddleExtensions = {
                    flowable: flowableModdle
                };
            }
            if (this.product == 'activiti') {
                moddleExtensions = {
                    activiti: activitiModele
                };
            }
            return moddleExtensions;
        }
    }
};
</script>

<style lang="scss" scoped></style>

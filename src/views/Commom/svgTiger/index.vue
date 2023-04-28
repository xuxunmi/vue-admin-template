<template>
    <div class="svg-tiger-page" v-loading="svgUrl ? loading : false">
        <embed
            v-if="svgUrl"
            id="svg"
            name="svg"
            style="width: 100%; height: 800px"
            ref="svg"
            :src="svgUrl"
            type="image/svg+xml"
            @load="loadSvg"
        />
    </div>
</template>

<script>
import svgPanZoom from 'svg-pan-zoom';
import { getSvgImage } from '@/api/vehiclePartsDetails/index.js';

export default {
    name: 'svgTiger',
    props: {
        oid: {
            type: String,
            required: true
        },
        // 表格行传过来得序号
        hotspot: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            svgUrl: undefined, // svg的url
            hotspots: [], // 热key值
            selectItem: '', // 点击选中的热key
            moveOveredItem: '' // 鼠标移入key
        };
    },
    watch: {
        oid: {
            handler(val) {
                if (!val) return;
                this.getSvg(val);
            },
            immediate: true
        },
        hotspot: {
            handler(val) {
                if (!val) return;
                let hotspotids = this.hotspots.filter(item => item.id === val.id);
                let hotspotid = hotspotids[0].id;
                let hotspotIndex = this.getHotSpotIndex(hotspotid);
                let item = this.hotspots[hotspotIndex];
                // 点击表格行时 设置当前热key背景颜色
                this.setSelectedSvgItem(item);
                // 点击表格行时 清空上一个热键的背景色
                this.setBackLatSvgItem(this.selectItem);
                this.selectItem = item;
            },
            deep: true
        }
    },
    methods: {
        //根据item no 获得 hotspot index
        getHotSpotIndex(itemno) {
            if (this.hotspots.length && this.hotspots.length > 0) {
                for (let i = 0; i < this.hotspots.length; i++) {
                    if (this.hotspots[i].id == itemno) {
                        return i;
                    }
                }
            }
            return -1;
        },
        // 原设置鼠标移入热key的颜色
        setMoveOverSvgItem(item) {
            // console.log('设置鼠标移入热key的颜色: ', item);
            if (!item.id) return;
            let hotspotid = item.id;
            // console.log('hotspotid: ', hotspotid);
            let svgElement = document.getElementById('svg');
            let svgDoc = svgElement.getSVGDocument();
            // 获取text元素;
            let textElements = svgDoc.getElementsByTagName('text');
            for (let i = 0; i < textElements.length; i++) {
                const textEle = textElements[i];
                let textid = ~~textEle.innerHTML;
                if (textid === hotspotid) {
                    textEle.setAttribute('fill', 'red');
                    textEle.setAttribute('stroke-width', '3');
                    textEle.setAttribute('stroke', 'red');
                    textEle.setAttribute('style', 'font-weight: bold;cursor: pointer');
                }
            }
        },
        // 设置鼠标移出热key的颜色
        setBackLatSvgItem(item) {
            // console.log('设置鼠标移出热key的颜色: ', item);
            if (!item.id) return;
            let hotspotid = item.id;
            let svgElement = document.getElementById('svg');
            let svgDoc = svgElement.getSVGDocument();
            // 获取text元素;
            let textElements = svgDoc.getElementsByTagName('text');
            for (let i = 0; i < textElements.length; i++) {
                const textEle = textElements[i];
                let textid = ~~textEle.innerHTML;
                if (textid === hotspotid) {
                    textEle.removeAttribute('fill');
                    textEle.removeAttribute('stroke-width');
                    textEle.removeAttribute('stroke');
                    textEle.removeAttribute('style');
                    textEle.setAttribute('font-size', '30px');
                }
            }
        },
        // 热键鼠标点击热键时颜色
        setSelectedSvgItem(item) {
            // console.log('鼠标点击热键时颜色: ', item);
            let hotspotid = item.id;
            let svgElement = document.getElementById('svg');
            let svgDoc = svgElement.getSVGDocument();
            // 获取text元素;
            let textElements = svgDoc.getElementsByTagName('text');
            for (let i = 0; i < textElements.length; i++) {
                const textEle = textElements[i];
                let textid = ~~textEle.innerHTML;
                if (textid === hotspotid) {
                    textEle.setAttribute('font-size', '46px');
                    // 点击左侧表格行时热key更改颜色
                    this.setMoveOverSvgItem(item);
                }
            }
        },
        // 热键鼠标移入事件
        svgMouseOver(counter) {
            return () => {
                // console.log('热键鼠标移入事件: ', counter);
                let hotspotIndex = this.getHotSpotIndex(counter);
                let item = this.hotspots[hotspotIndex];
                if (this.selectItem != '' && this.selectItem != item) {
                    this.setMoveOverSvgItem(item);
                } else if (this.selectItem == '') {
                    this.setBackLatSvgItem(this.moveOveredItem);
                    this.setMoveOverSvgItem(item);
                }
                this.moveOveredItem = item;
            };
        },
        // 热键鼠标移出事件
        svgMouseOut(counter) {
            // console.log('热键鼠标移出事件:', counter);
            return () => {
                let hotspotIndex = this.getHotSpotIndex(counter);
                let item = this.hotspots[hotspotIndex];
                if (this.selectItem != this.moveOveredItem && this.moveOveredItem != '' && this.selectItem != item) {
                    this.setBackLatSvgItem(item);
                }
            };
        },
        // 处理热键点击事件
        svgClick(counter) {
            // console.log('热键点击事件: ', counter);
            return () => {
                let hotspotIndex = this.getHotSpotIndex(counter);
                let item = this.hotspots[hotspotIndex];
                // 点击时 设置背景颜色
                this.setSelectedSvgItem(item);
                // 点击时清空上一个热键的背景色
                this.setBackLatSvgItem(this.selectItem);
                this.selectItem = item;
                // 点击时，设置表格选中行
                this.$emit('setBackSelectTableRow', item.id);
            };
        },
        // 初始化svg
        loadSvg() {
            let svgElement = document.getElementById('svg');
            let svgDoc = svgElement.getSVGDocument();
            // console.log('svgDoc:', svgDoc);
            // 获取svg元素;
            let svgDocment = svgDoc.getElementsByTagName('svg')[0];
            // console.log('svgDocment: ', svgDocment);
            // 为svg设置id 宽高等属性
            svgDocment.setAttribute('id', 'svg-tiger');
            svgDocment.setAttribute('style', 'width: 700px;height: 800px;');
            // 为每个text标签添加移入,移出，单击事件
            // let textElements = svgDocment.querySelectorAll('text');
            let textElements = svgDocment.getElementsByTagName('text');
            // console.log('textElements: ', textElements);
            for (let i = 0; i < textElements.length; i++) {
                const element = textElements[i];
                // console.log(`element${i}: `, element);
                let textId = ~~element.innerHTML;
                // console.log('textId： ', textId);
                let textName = element.nodeName;
                let textObj = {};
                textObj.id = textId;
                textObj.label = textName;
                // console.log('textObj: ', textObj);
                // 热键数组赋值
                this.hotspots[i] = textObj;
                // 操作页面热key
                element.onmouseover = this.svgMouseOver(textId);
                element.onmouseout = this.svgMouseOut(textId);
                element.onclick = this.svgClick(textId);
            }
            // console.log('this.hotspots: ', this.hotspots);
            // 鼠标操作svg 放大 缩小 重置及svg图中放大，缩小，重置按钮
            svgPanZoom(svgDocment, {
                zoomEnabled: true,
                fit: true,
                controlIconsEnabled: true,
                contain: true
            });
        },
        async getSvg(oid) {
            try {
                this.loading = true;
                const { data } = await getSvgImage(oid);
                this.svgUrl = data.svgUrl;
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>

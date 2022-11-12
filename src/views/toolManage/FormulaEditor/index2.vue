<template>
    <div class="formula-editor-page">
        <div id="formulaPage">
            <p>公式：{{ formulaStr }}</p>
            <div class="btnGroup">
                <!-- <button @click="mouseRange($event)">获取光标</button> -->
                <el-button type="primary" size="small" @click="getFormula">获取公式</el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="parsingFormula('#字段1#+plus(#字段1#+#字段3#)*abs(#字段4#/#字段2#)')"
                >
                    反向解析公式
                </el-button>
            </div>
            <div class="tab">
                <div class="tit">添加公式</div>
                <ul>
                    <li @click="addItem($event, 2)">plus()</li>
                    <li @click="addItem($event, 2)">abs()</li>
                </ul>
            </div>
            <div class="tab">
                <div class="tit">添加字段</div>
                <ul>
                    <li @click="addItem($event, 1)">字段1</li>
                    <li @click="addItem($event, 1)">字段2</li>
                    <li @click="addItem($event, 1)">字段3</li>
                    <li @click="addItem($event, 1)">字段4</li>
                </ul>
            </div>
            <!-- 公式编辑区域 -->
            <div
                class="formulaView"
                ref="formulaView"
                contentEditable="true"
                @click="recordPosition"
                @keyup="editEnter($event)"
                @copy="copy($event)"
                @paste="paste($event)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'formulaEditor',
    data() {
        return {
            // 公式字符串
            formulaStr: '',
            // 公式编辑器最后光标位置
            formulaLastRange: null
        };
    },
    methods: {
        // 获取公式
        getFormula: function () {
            var nodes = this.$refs.formulaView.childNodes;
            var str = '';
            for (let i = 0; i < nodes.length; i++) {
                var el = nodes[i];
                if (el.nodeName == 'SPAN') {
                    // console.log(el);
                    str += '#' + el.innerHTML.trim() + '#';
                } else {
                    // console.log(el.data);
                    str += el.data ? el.data.trim() : '';
                }
            }
            // console.log(str);
            this.formulaStr = str;
        },
        // 点选时记录光标位置
        recordPosition: function () {
            // 保存最后光标点
            this.formulaLastRange = window.getSelection().getRangeAt(0);
        },
        // 添加字段 type 1 字段  2 公式
        addItem: function (e, type) {
            // 当前元素所有子节点
            var nodes = this.$refs.formulaView.childNodes;
            // 当前子元素偏移量
            var offset = this.formulaLastRange && this.formulaLastRange.startOffset;
            // 当前光标后的元素
            var nextEl = this.formulaLastRange && this.formulaLastRange.endContainer;

            // 创建节点片段
            var fd = document.createDocumentFragment();
            // 创建字段节点  空白间隔节点  公式节点
            var spanEl = document.createElement('span');
            spanEl.setAttribute('contentEditable', false);
            // 标识为新添加元素 用于定位光标
            spanEl.setAttribute('new-el', true);
            spanEl.innerHTML = e.target.innerHTML;
            var empty = document.createTextNode(' ');
            var formulaEl = document.createTextNode(' ' + e.target.innerHTML + ' ');

            // 区分文本节点替换 还是父节点插入
            if (nextEl && nextEl.className != 'formulaView') {
                // 获取文本节点内容
                var content = nextEl.data;

                // 添加前段文本
                fd.appendChild(document.createTextNode(content.substr(0, offset) + ' '));
                fd.appendChild(type == 1 ? spanEl : formulaEl);
                // 添加后段文本
                fd.appendChild(document.createTextNode(' ' + content.substr(offset)));
                // 替换节点
                this.$refs.formulaView.replaceChild(fd, nextEl);
            } else {
                // 添加前段文本
                fd.appendChild(empty);
                fd.appendChild(type == 1 ? spanEl : formulaEl);
                fd.appendChild(empty);

                // 如果有偏移元素且不是最后节点  中间插入节点  最后添加节点
                if (nodes.length && nodes.length > offset) {
                    this.$refs.formulaView.insertBefore(
                        fd,
                        nextEl && nextEl.className != 'formulaView' ? nextEl : nodes[offset]
                    );
                } else {
                    this.$refs.formulaView.appendChild(fd);
                }
            }

            // 遍历光标偏移数据 删除标志
            var elOffSet = 0;
            for (let i = 0; i < nodes.length; i++) {
                let el = nodes[i];
                // console.log(el,el.nodeName == 'SPAN'&&el.getAttribute('new-el'));
                if (el.nodeName == 'SPAN' && el.getAttribute('new-el')) {
                    elOffSet = i;
                    el.removeAttribute('new-el');
                }
            }

            // 创建新的光标对象
            var range = document.createRange();
            // 光标对象的范围界定
            range.selectNodeContents(type == 1 ? this.$refs.formulaView : formulaEl);
            // 光标位置定位
            range.setStart(
                type == 1 ? this.$refs.formulaView : formulaEl,
                type == 1 ? elOffSet + 1 : formulaEl.data.length - 2
            );

            // 使光标开始和光标结束重叠
            range.collapse(true);
            // 清除选定对象的所有光标对象
            window.getSelection().removeAllRanges();
            // 插入新的光标对象
            window.getSelection().addRange(range);

            // 保存新光标
            this.recordPosition();
        },
        // 复制
        copy: function (e) {
            // 选中复制内容
            e.preventDefault();
            //
            var selContent = document.getSelection().toString().split('\n')[0];
            // 替换选中内容
            e.clipboardData.setData('text/plain', selContent);
        },
        // 输入回车
        editEnter: function (e) {
            // console.log(e);
            e.preventDefault();

            // return '<br/>';
            // return
            if (e.keyCode == 13) {
                // 获取标签内容 并把多个换行替换成1个
                var content = this.$refs.formulaView.innerHTML.replace(/(<div><br><\/div>){2,2}/g, '<div><br></div>');

                // debugger;

                // 记录是否第一行回车
                var divCount = this.$refs.formulaView.querySelectorAll('div');
                // var tE = this.$refs.formulaView.querySelect('div');
                // console.log(this.$refs.formulaView.childNodes);
                // console.log(this.$refs.formulaView.querySelectorAll("div"));
                // 获取当前元素内所有子节点
                var childNodes = this.$refs.formulaView.childNodes;
                // 记录当前光标子节点位置
                var rangeIndex = 0;
                for (let i = 0; i < childNodes.length; i++) {
                    var one = childNodes[i];
                    if (one.nodeName == 'DIV') {
                        rangeIndex = i;
                    }
                }
                // console.log(rangeIndex);
                // debugger;
                // console.log(content);

                // 如果有替换则进行光标复位
                if (divCount.length >= 1) {
                    // 替换回车插入的div标签
                    content = content.replace(/<div>|<\/div>/g, function (word) {
                        // console.log(word);
                        if (word == '<div>') {
                            // 如果是第一行不在替换br
                            return divCount.length > 1 ? ' ' : ' <br>';
                        } else if (word == '</div>') {
                            return ' ';
                        }
                    });
                    // 更新替换内容，光标复位
                    this.$refs.formulaView.innerHTML = content;
                    // 创建新的光标对象
                    var range = document.createRange();
                    // 光标对象的范围界定为新建的表情节点
                    range.selectNodeContents(this.$refs.formulaView);
                    // 光标位置定位在表情节点的最大长度
                    range.setStart(this.$refs.formulaView, rangeIndex + (divCount.length > 1 ? 0 : 1));
                    // 使光标开始和光标结束重叠
                    range.collapse(true);
                    // 清除选定对象的所有光标对象
                    window.getSelection().removeAllRanges();
                    // 插入新的光标对象
                    window.getSelection().addRange(range);
                }
            }
            // 保存最后光标点
            this.formulaLastRange = window.getSelection().getRangeAt(0);
        },
        // 获取粘贴事件
        paste: function (e) {
            e.preventDefault();
            // var txt = e.clipboardData.getData();
            // console.log(e, e.clipboardData.getData());
            return '';
        },
        // 公式反向解析
        parsingFormula: function (formulaStr) {
            // 渲染视口
            var view = this.$refs.formulaView;
            // 反向解析公式
            var str = formulaStr.replace(/#(.+?)#/g, function (word, $1) {
                // console.log(word,$1);
                return "<span contentEditable='false'>" + $1 + '</span>';
            });

            // console.log(str,fd.innerHTML);
            view.innerHTML = str;
            // this.$refs.formulaView.appendChild(fd);

            // 创建新的光标对象
            var range = document.createRange();
            // 光标对象的范围界定为新建的表情节点
            range.selectNodeContents(view);
            // 光标位置定位在表情节点的最大长度
            range.setStart(view, view.childNodes.length);

            // 使光标开始和光标结束重叠
            range.collapse(true);
            // 清除选定对象的所有光标对象
            window.getSelection().removeAllRanges();
            // 插入新的光标对象
            window.getSelection().addRange(range);

            // 保存新光标
            this.recordPosition();
        }
    }
};
</script>

<style lang="scss" scoped>
.formula-editor-page {
    #formulaPage {
        > .btnGroup,
        > .tab {
            margin-top: 15px;
        }
        > .tab {
            > ul {
                &:after {
                    content: '';
                    display: table;
                    clear: both;
                }
                > li {
                    margin-right: 20px;
                    float: left;
                    padding: 0 10px;
                    height: 25px;
                    line-height: 25px;
                    border-radius: 5px;
                    border: 1px solid #000;
                }
            }
        }
        > .formulaView {
            margin-top: 20px;
            min-height: 100px;
            width: 300px;
            padding: 5px;
            border: 2px solid #000;
            resize: both;
            overflow: auto;
            line-height: 25px;
            span {
                user-select: none;
                display: inline-block;
                margin: 0 3px;
                height: 20px;
                line-height: 20px;
                letter-spacing: 2px;
                background: #aaa;
                border-radius: 3px;
                white-space: nowrap;
                color: red;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
}
</style>

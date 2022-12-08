<template>
    <div class="iconfont-page">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-picture-outline-round"></i> elementUI-icons</span>
                <p class="pTitle">
                    直接通过设置类名为
                    <code>el-icon-iconName</code> 来使用即可，例如：<code>{{ exampleText1 }}</code
                    >，官网地址：<a
                        style="color: blue;"
                        target="_blank"
                        href="https://element.eleme.cn/#/zh-CN/component/installation"
                        >Element-UI</a
                    >
                </p>
                <h1>使用示例：</h1>
                <ul class="iconUl">
                    <li v-for="item in elementIconsList" :key="item">
                        <i :class="item"></i>
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-promotion"></i> iconfont矢量图标库</span>
                <p class="pTitle">
                    这里是通过使用阿里iconfont在项目中生成字体图标，直接通过设置 <strong>i</strong> 标签类名为
                    <code> class="iconfont el-icon-iconName" </code>， 例如：<code>{{ exampleText2 }}</code>
                    来使用即可，官网地址：<a style="color: blue;" target="_blank" href="https://www.iconfont.cn/"
                        >iconfont矢量图标库</a
                    >
                </p>
                <h1>使用示例：</h1>
                <ul class="iconUl">
                    <li v-for="item in iconfontList" :key="item">
                        <i :class="'iconfont ' + item"></i>
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { elementIconsList } from './element-icons';
import { iconfontList } from './iconfont';
export default {
    name: 'iconfont',
    data() {
        return {
            elementIconsList,
            iconfontList,
            exampleText1: '<i class="el-icon-s-promotion"></i>',
            exampleText2: '<i class="iconfont el-icon-weixin"></i>'
        };
    }
};
</script>

<style lang="scss" scoped>
.iconfont-page {
    margin-top: 50px;
    padding: 0 20px;
    code {
        background-color: #f9fafc;
        padding: 0 4px;
        border: 1px solid #eaeefb;
        border-radius: 4px;
    }
    h1 {
        margin-top: 20px;
    }
    .iconUl {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        border: 1px solid #eee;
        border-right: none;
        li {
            text-align: center;
            width: 138px;
            height: 120px;
            color: #666;
            font-size: 13px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            margin-right: -1px;
            margin-bottom: -1px;
            &:hover {
                i {
                    color: #5cb6ff;
                }
                span {
                    color: #5cb6ff;
                }
            }
            i {
                display: block;
                font-size: 32px;
                margin-bottom: 15px;
                color: #606266;
                transition: color 0.15s linear;
                margin-top: 30px;
            }
            span {
                color: #99a9bf;
            }
        }
    }
}
</style>

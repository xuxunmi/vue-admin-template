<template>
    <div class="formula-editor-page">
        <h1 class="text-2xl font-bold">公式：</h1>
        <div class="formula-editor">
            <textarea v-model="formula" cols="30" rows="10"></textarea>
        </div>
        <h2 class="text-2xl font-bold">结果：</h2>
        <vue-mathjax :formula="formula" :safe="false"></vue-mathjax>
    </div>
</template>

<script>
import VueMathjax from '@components/vueMathjax/vue-mathjax.vue';
export default {
    name: 'formulaEditor',
    components: {
        VueMathjax
    },
    data() {
        return {
            // formula: ''
            // formula: '$$借款本金=\\sum _{nT}^{i=1}\\frac{第i期支付金额}{1+年化综合成本}$$'
            formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
            // formula: '$$\alpha+\beta=\gamma$$',
            // formula: '$$\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}$$',
        };
    }
};
</script>

<style lang="scss" scoped>
.formula-editor-page {
    height: 100%;
    margin-top: 45px;
    padding: 0 20px;
    background-color: #eaedf1;
    .formula-editor {
        textarea {
            display: block;
            width: 500px;
            margin: 0 auto;
            border: 1px solid #ccc;
            padding: 10px;
            resize: none;
        }
    }
}
</style>

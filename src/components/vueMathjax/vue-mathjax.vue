<template>
    <div class="mathJaxEl-page">
        <div ref="mathJaxEl" id="mathJaxEl">{{ formula }}</div>
    </div>
</template>

<script>
export default {
    name: 'VueMathjax',
    props: {
        formula: {
            type: String,
            default: ''
        },
        safe: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        formula() {
            this.renderMathJax();
        }
    },
    mounted() {
        this.renderMathJax();
    },
    updated() {
        this.renderMathJax();
    },
    methods: {
        renderContent() {
            if (this.safe) {
                this.$refs.mathJaxEl.textContent = this.formula;
            } else {
                this.$refs.mathJaxEl.innerHTML = this.formula;
            }
        },

        renderMathJax() {
            let that = this;
            that.renderContent();
            that.$nextTick(function () {
                if (window.MathJax) {
                    window.MathJax.Hub.Config({
                        extensions: ['tex2jax.js'],
                        showProcessingMessages: false, //关闭js加载过程信息
                        messageStyle: 'none', //不显示信息
                        jax: ['input/TeX', 'output/HTML-CSS'],
                        tex2jax: {
                            inlineMath: [
                                ['$', '$'],
                                ['\\(', '\\)']
                            ], //行内公式选择符
                            displayMath: [
                                ['$$', '$$'],
                                ['\\[', '\\]']
                            ], //段内公式选择符
                            processEscapes: true,
                            processEnvironments: true,
                            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'] //避开某些标签
                        },
                        // Center justify equations in code and markdown cells. Elsewhere
                        // we use CSS to left justify single line equations in code cells.
                        displayAlign: 'center',
                        'HTML-CSS': {
                            availableFonts: ['STIX', 'TeX'], //可选字体
                            showMathMenu: true, //右击菜单显示
                            styles: { '.MathJax_Display': { margin: 0 } },
                            linebreaks: { automatic: true }
                        }
                    });
                    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.$refs.mathJaxEl]);
                }
            });

            // that.$nextTick(function () {
            //     if (that.MathJax.isMathjaxConfig) {
            //         //判断是否初始配置，若无则配置。
            //         that.MathJax.initMathjaxConfig();
            //     }
            //     that.MathJax.MathQueue(this.$refs.mathJaxEl.id); //传入组件id，让组件被MathJax渲染
            // });
        }
    }
};
</script>
<style lang="scss" scoped>
.mathJaxEl-page {
    div {
        word-wrap: break-word;
        word-break: normal;
    }
}
</style>

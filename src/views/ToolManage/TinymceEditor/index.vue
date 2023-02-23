<template>
    <div class="tinymce-editor-page">
        <h1 class="text-center">TinyMCE富文本编辑器</h1>
        <div class="text-left ml-44"><el-button type="primary" @click="handleSaveBtn">保存修改</el-button></div>
        <my-tinymce class="my-tinymce mx-44 mt-4" ref="editor" :height="750" v-model="value" />
    </div>
</template>

<script>
import tinymce from '@/components/Tinymce/index.vue';
export default {
    name: 'tinymceEditor',
    components: { 'my-tinymce': tinymce },
    props: {
        // 父组件传过来的值，用于回显
        fatherValue: {
            typeof: String,
            default: '此值用于回显用！！！！'
        }
    },
    data() {
        return {
            value: ''
        };
    },
    watch: {
        fatherValue: {
            handler(val) {
                if (!val) return;
                this.value = val;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleSaveBtn() {
            alert(this.$refs.editor.contentValue);
        }
    }
};
</script>

<style lang="scss" scoped>
.tinymce-editor-page {
    width: 100%;
    height: 100%;
    margin-top: 60px;
    .my-tinymce {
        width: 80%;
    }
}
</style>

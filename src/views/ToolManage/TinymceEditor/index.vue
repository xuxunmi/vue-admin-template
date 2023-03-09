<template>
    <div class="tinymce-editor-page w-full h-full overflow-hidden" :class="{ 'pt-20': tagsList.length }">
        <h1 class="text-center">TinyMCE富文本编辑器</h1>
        <div class="text-left ml-44"><el-button type="primary" @click="handleSaveBtn">保存修改</el-button></div>
        <my-tinymce class="my-tinymce mx-44 mt-4 w-4/5" ref="editor" :height="720" v-model="value" />
    </div>
</template>

<script>
import tinymce from '@/components/Tinymce/index.vue';
import { mapState } from 'vuex';

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
    computed: {
        ...mapState(['tagsList'])
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

<style lang="scss" scoped></style>

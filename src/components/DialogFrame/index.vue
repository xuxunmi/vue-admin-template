<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        center
    >
        <slot></slot>
        <span v-if="footer" slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '标题'
        },
        width: {
            type: String,
            default: '30%'
        },
        footer: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit('update:show', val);
            }
        }
    }
};
</script>

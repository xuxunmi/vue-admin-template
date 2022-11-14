<template>
    <div class="tinymce-container">
        <Editor id="tinymce" v-model="contentValue" :init="init" :disabled="disabled"></Editor>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'; //编辑器引入
import tinymce from 'tinymce/tinymce'; //tinymce默认hidden
import 'tinymce/themes/silver/theme'; //编辑器主题
import 'tinymce/icons/default'; //引入编辑器图标icon

import 'tinymce/plugins/textcolor'; //颜色
import 'tinymce/plugins/advlist'; //高级列表
import 'tinymce/plugins/autolink'; //自动链接
import 'tinymce/plugins/link'; //超链接
import 'tinymce/plugins/image'; //插入编辑图片
import 'tinymce/plugins/lists'; //列表插件
import 'tinymce/plugins/charmap'; //特殊字符
import 'tinymce/plugins/media'; //插入编辑媒体
import 'tinymce/plugins/wordcount'; // 字数统计
import 'tinymce/plugins/contextmenu'; //右键菜单插件
import 'tinymce/plugins/hr';
import 'tinymce/plugins/table';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/imagetools';

export default {
    name: 'tinymce',
    props: {
        //内容
        value: {
            type: String,
            default: ''
        },
        // 高度
        height: {
            type: Number,
            default: 500
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //插件
        plugins: {
            type: [String, Array],
            default: 'advlist autolink link image lists charmap table fullscreen imagetools preview hr'
        },
        //工具栏
        toolbar: {
            type: [String, Array],
            default:
                'undo redo |  formatselect | forecolor backcolor bold italic charmap underline  strikethrough  hr link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lists table image | fullscreen | preview'
        }
    },
    components: {
        Editor
    },
    data() {
        return {
            contentValue: this.value,
            init: {
                selector: '#tinymce',
                language_url: 'tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: 'tinymce/skins/ui/oxide',
                content_css: 'tinymce/skins/content/document/content.css',
                height: this.height,
                plugins: this.plugins,
                toolbar: this.toolbar,
                browser_spellcheck: true,
                branding: false, // 去除水印“Powered by TinyMCE”
                resize: 'both', // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
                elementpath: false,
                paste_data_images: true, //图片是否可粘贴
                statusbar: true, // 底部的状态栏
                menubar: true, // 最上方的菜单
                file_picker_types: 'image',
                images_upload_credentials: true,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                font_formats:
                    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino',
                images_upload_handler: function (blobInfo, success, failure) {
                    console.log('blobInfo: ', blobInfo);
                    console.log('success: ', success);
                    console.log('failure: ', failure);
                    // 默认插入base64方式
                    const img = 'data:image/jpeg;base64,' + blobInfo.base64();
                    success(img);
                    // const file_type = blobInfo.blob().type;
                    // const name = (blobInfo.filename && blobInfo.filename()) || blobInfo.blob().name;
                    // //格式校验
                    // const isAccept =
                    //     file_type === 'image/jpeg' ||
                    //     file_type === 'image/png' ||
                    //     file_type === 'image/GIF' ||
                    //     file_type === 'image/jpg' ||
                    //     file_type === 'image/BMP';
                    // //大小校验
                    // if (blobInfo.blob().size / 1024 / 1024 > 2) {
                    //     failure('上传失败，图片大小请控制在 2M 以内');
                    //     _this.$message.warning('上传失败，图片大小请控制在 2M 以内');
                    // } else if (!isAccept) {
                    //     _this.$message.warning('图片格式错误');
                    //     failure('图片格式错误');
                    // } else {
                    //     //上传
                    //     let formData = new FormData();
                    //     // 服务端接收文件的参数名，文件数据，文件名
                    //     formData.append('文件参数', blobInfo.blob(), name);
                    //     这里调用你的上传方法将参数传递至后端(formData)
                    //         .then(result => {
                    //             // 这里返回的是你图片的地址
                    //             success(result.url);
                    //         })
                    //         .catch(() => {
                    //             failure('上传失败');
                    //         });
                    // }
                }
            }
        };
    },
    watch: {
        value(newValue) {
            this.contentValue = newValue;
        }
    },
    mounted() {
        tinymce.init({});
    }
};
</script>

<style lang="scss" scoped></style>

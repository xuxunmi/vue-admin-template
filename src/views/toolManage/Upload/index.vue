<template>
    <div class="uplaod-page w-full h-full mt-8">
        <div class="grid justify-center content-center h-full">
            <el-upload
                class="upload-file"
                action="#"
                ref="upload"
                :http-request="uploadFile"
                :limit="fileLimit"
                :file-list="fileList"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload"
                :show-file-list="false"
            >
                <el-button type="primary" plain>{{ loading ? '文件上传中...' : '文件上传' }}</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    name: 'uplaod',
    data() {
        return {
            loading: false,
            fileList: [], //上传后的文件列表
            fileType: ['zip', 'doc', 'docx', 'xls', 'xlsx', 'pdf'], // 允许的文件类型
            fileSize: 50, // 运行上传文件大小，单位 M
            fileLimit: 1 // 附件数量限制
        };
    },
    methods: {
        uploadFile(file) {
            console.log('file: ', file);
            this.loading = true;
            const formData = new FormData();
            this.fileList.forEach(file => {
                formData.append('files', file.raw);
            });
            // attachmentBatchUpload(formData)
            //     .then(res => {
            //         let { code, data } = res;
            //         if (code === '200') {
            //             if (this.attachmentUploadData.length > 0) {
            //                 this.attachmentUploadData.push(...data);
            //             } else {
            //                 this.attachmentUploadData = data;
            //             }
            //             // 每次上传后删除数组开头第一个文件
            //             this.fileList.shift();
            //             // let hasName = {};
            //             // this.attachmentUploadData = this.attachmentUploadData.reduce((item, next) => {
            //             //     hasName[next.fileOriginName]
            //             //         ? ''
            //             //         : (hasName[next.fileOriginName] = true && item.push(next));
            //             //     return item;
            //             // }, []);
            //             this.loading = false;
            //             // console.log('this.attachmentUploadData:', this.attachmentUploadData);
            //         }
            //         this.$message({
            //             type: 'success',
            //             message: '文件上传成功！',
            //             center: true
            //         });
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     });
        },
        // 文件上传之前处理钩子
        handleBeforeUpload(file) {
            if (!file) return;
            const FileSuffix = file.name.replace(/.+\./, '').toLowerCase();
            const isLt50M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
            if (!isLt50M) {
                this.$message({
                    type: 'warning',
                    message: '上传文件大小不能超过 50MB!',
                    center: true
                });
                // 重置上传按钮loading
                this.loading = false;
                return false;
            }
            if (this.fileType.includes(FileSuffix)) {
                return true;
            } else {
                // 防止文件格式不正确时，message提示框出现重叠现象
                setTimeout(() => {
                    this.$message({
                        type: 'warning',
                        message: '上传文件格式不正确，仅允许doc, docx, xls, xlsx, zip, pdf的文件格式',
                        center: true
                    });
                    // 重置上传按钮loading
                    this.loading = false;
                    return false;
                }, 10);
            }
        },
        handleChange(file, fileList) {
            // 每次上传后删除数组开头第一个文件
            // this.fileList.shift();
            if (!fileList.length) {
                this.$message({
                    type: 'warning',
                    message: '请选取文件后再上传',
                    center: true
                });
                return;
            }
            this.fileList = fileList;
            // console.log('this.fileList: ', this.fileList);
        },
        // 文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message({
                type: 'warning',
                message: `当前限制选择 ${this.fileLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                    files.length + fileList.length
                } 个文件`,
                center: true
            });
            return;
        }
    }
};
</script>

<style lang="scss" scoped></style>

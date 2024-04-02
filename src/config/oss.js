import { uploadImgOss } from '@/api/common/index.js';

export async function uploadImg(file) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append('file', file.file);
            let result = uploadImgOss(formData);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
}

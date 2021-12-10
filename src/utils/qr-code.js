import qrcode from 'qrcode';

// 生成二维码
export async function generateQRCode(options) {
    let { url, width, margin, errorCorrectionLevel } = options;
    options = {
        margin: 0,
        width: width,
        errorCorrectionLevel: errorCorrectionLevel || 'L'
    };
    try {
        return await qrcode.toDataURL(url, options);
    } catch (err) {
        console.error(err, '二维码生成错误');
    }
}

// 前端生成二维码-下载二维码
export function downloadGenerateQRCode(url, name = '图片') {
    if (window.navigator.msSaveOrOpenBlob) {
        // ie
        var bstr = atob(url.split(',')[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, name + '.png');
    } else {
        // 非ie
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', name + '.png');
        a.click();
    }
}

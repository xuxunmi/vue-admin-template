import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
// import { get as getStorage } from '@/utils/storage.js'
// import router from '@/router/index.js';
import store from '@/store/index.js';
import { HTTP_STATUS_CODE } from './httpErrorCode.js';

axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? '/' : '/api';

axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};

// 请求拦截器
axios.interceptors.request.use(
    config => {
        const token = store.getters.token || '';
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器器
axios.interceptors.response.use(
    response => {
        console.log('响应成功结果response: ', response);
        if (response.data.code == 200) {
            return Promise.resolve(response.data);
        } else {
            Message({
                message: response.data.msg,
                type: 'error',
                duration: 3 * 1000,
                center: true
            });
            return Promise.reject(new Error(response.data || 'Error'));
        }
    },
    error => {
        console.log('响应成功结果error: ', error);
        // if (error && error.response) {
        //     switch (error.response.status) {
        //         case 400:
        //             error.message = 'Bad Request 错误请求';
        //             break;
        //         case 401:
        //             error.message = '未授权，请重新登录';
        //             break;
        //         case 403:
        //             error.message = 'Forbidden 禁止访问';
        //             break;
        //         case 404:
        //             error.message = 'Not Found 请求错误,未找到该资源';
        //             break;
        //         case 405:
        //             error.message = 'Method Not Allowed 请求方法未允许';
        //             break;
        //         case 408:
        //             error.message = 'Request Timeout 请求超时';
        //             break;
        //         case 500:
        //             error.message = 'Internal Server Error 服务器端出错';
        //             break;
        //         case 501:
        //             error.message = 'Not Implemented 网络未实现';
        //             break;
        //         case 502:
        //             error.message = 'Bad Gateway 网关故障';
        //             break;
        //         case 503:
        //             error.message = 'Service Temporarily Unavailable 服务不可用';
        //             break;
        //         case 504:
        //             error.message = 'Gateway Time-out 网络超时';
        //             break;
        //         case 505:
        //             error.message = 'HTTP Version Not Supported(不支持的HTTP版本)';
        //             break;
        //         default:
        //             error.message = `连接错误${error.response.status}`;
        //     }
        // } else {
        //     error.message = '连接到服务器失败';
        // }
        if (error && error.response) {
            error.message = HTTP_STATUS_CODE[error.response.status];
        } else {
            error.message = HTTP_STATUS_CODE.default;
        }
        Message({
            message: `${error.message}`,
            type: 'error',
            duration: 3000,
            center: true
        });
        return Promise.reject(error.response || error);
    }
);

export default {
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    post(url, data, contentType) {
        let setting = {};
        if (contentType) {
            setting = {
                'Content-Type': contentType
            };
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: contentType ? data : qs.stringify(data),
                headers: setting
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    download(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                data: data,
                responseType: 'blob'
            })
                .then(res => {
                    const blob = new Blob([res.data]);
                    const fileName = res.headers['content-disposition'].split('=')[1];
                    if ('download' in document.createElement('a')) {
                        // 非IE下载
                        const elink = document.createElement('a');
                        elink.download = fileName;
                        elink.href = URL.createObjectURL(blob);
                        const body = document.getElementsByTagName('body')[0];
                        body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(url);
                        body.removeChild(elink);
                    } else {
                        // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import http from 'http';
import https from 'https';
import { Message } from 'element-ui';
Vue.prototype.$message = Message;
// import { get as getStorage } from '@/utils/storage.js'
// import router from '@/router/index.js';
import store from '@/store/index.js';
import { HTTP_STATUS_CODE } from './httpErrorCode.js';

// axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? '/' : '/api';
// axios.defaults.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
// };

// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? '/' : '/api',
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    // 跨域是否带Token
    withCredentials: true,
    // 响应的数据格式 json / blob /document /arraybuffer / text / stream
    responseType: 'json',
    // 超时设置
    timeout: 5 * 1000,
    // 用于node.js
    httpAgent: new http.Agent({
        keepAlive: true
    }),
    httpsAgent: new https.Agent({
        keepAlive: true
    })
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = store.getters.token || '';
        //只针对get方式进行序列化
        if (config.method === 'get') {
            config.paramsSerializer = function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            };
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器器
service.interceptors.response.use(
    response => {
        console.log('响应成功结果response: ', response);
        if (response.data.code === 200) {
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
    /**
     * 封装get请求
     * @param url
     * @param params {Object}
     * @returns {Promise}
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url,
                params: params
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    /**
     * 封装post请求
     * @param url
     * @param data {Object}
     * @param contentType
     * @returns {Promise}
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: JSON.stringify(data)
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    /**
     * 封装put请求
     * @param url
     * @param params {Object}
     * @returns {Promise}
     */
    put(url, params) {
        return new Promise((resolve, reject) => {
            service({
                method: 'put',
                url,
                params
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    /**
     * 封装delete请求
     * @param url
     * @param params {Object}
     * @returns {Promise}
     */
    delete(url, params) {
        return new Promise((resolve, reject) => {
            service({
                method: 'delete',
                url,
                params: params
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    /**
     * 封装文件下载
     * @param url
     * @param data {Object}
     * @param contentType
     * @returns {Promise}
     */
    downBlobFile(url, data, fileName) {
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url: url,
                data: data,
                responseType: 'blob'
            })
                .then(res => {
                    const blob = new Blob([res.data]);
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

    // /**
    //  *
    //  * @param url 目标下载接口
    //  * @param query 查询参数
    //  * @param fileName 文件名称
    //  * @returns {*}
    //  */
    // downBlobFile(url, query, fileName) {
    //     return service({
    //         url: url,
    //         method: 'get',
    //         responseType: 'blob',
    //         params: query
    //     }).then(response => {
    //         // 处理返回的文件流
    //         const blob = response.data;
    //         if (blob && blob.size === 0) {
    //             this.$notify.error('内容为空，无法下载');
    //             return;
    //         }
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = fileName;
    //         document.body.appendChild(link);
    //         link.click();
    //         window.setTimeout(function () {
    //             URL.revokeObjectURL(blob);
    //             document.body.removeChild(link);
    //         }, 0);
    //     });
    // }
};

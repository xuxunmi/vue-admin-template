import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
// import { get as getStorage } from '@/utils/storage.js'
import router from '@/router/index.js';
import store from '@/store/index.js';

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
        if (response.status == 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        // if (error && error.response) {
        //     switch (error.response.status) {
        //         case 400:
        //             error.message = '错误请求';
        //             break;
        //         case 401:
        //             error.message = '未授权，请重新登录';
        //             break;
        //         case 403:
        //             error.message = '拒绝访问';
        //             break;
        //         case 404:
        //             error.message = '请求错误,未找到该资源';
        //             break;
        //         case 405:
        //             error.message = '请求方法未允许';
        //             break;
        //         case 408:
        //             error.message = '请求超时';
        //             break;
        //         case 500:
        //             error.message = '服务器端出错';
        //             break;
        //         case 501:
        //             error.message = '网络未实现';
        //             break;
        //         case 502:
        //             error.message = '网络错误';
        //             break;
        //         case 503:
        //             error.message = '服务不可用';
        //             break;
        //         case 504:
        //             error.message = '网络超时';
        //             break;
        //         case 505:
        //             error.message = 'http版本不支持该请求';
        //             break;
        //         default:
        //             error.message = `连接错误${error.response.status}`;
        //     }
        // }
        if (error.response.data.code !== 200) {
            Message.error(error.response.msg);
            return false;
        }
        if (error.response.data.code === 500) {
            Message.error(error.response.msg);
            localStorage.clear();
            router.push({ path: '/login' });
        }
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
                    Message.error(JSON.stringify(err.message));
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
                    Message.error(JSON.stringify(err.message));
                    reject(err);
                });
        });
    },
    export(url, data, name) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: data,
                responseType: 'blob'
            })
                .then(res => {
                    const blob = new Blob([res]);
                    const filename = name;
                    const a = document.createElement('a');
                    const url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename;
                    const body = document.getElementsByTagName('body')[0];
                    body.appendChild(a);
                    a.click();
                    body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    resolve(res);
                })
                .catch(err => {
                    Message.error(JSON.stringify(err.message));
                    reject(err);
                });
        });
    }
};

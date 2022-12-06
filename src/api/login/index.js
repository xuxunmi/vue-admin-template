import request from '@/http/request.js';

/**
 * @description:登录
 */
export function login(param) {
    return request.post('/loginApi', param);
}

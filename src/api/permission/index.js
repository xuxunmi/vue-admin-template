import request from '@/http/request.js';

/**
 * @description:获取动态菜单
 */
export function getDynamicMenuList(param) {
    return request.get('/sysMenu/menuAndButtonTreeChildren', param);
}

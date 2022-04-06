import request from '@/http/request.js';

/**
 * @description:活动管理活动列表/搜索
 */
export function getReceiptList(param) {
    return request.get('/project/answer_inform_settings/', param);
}

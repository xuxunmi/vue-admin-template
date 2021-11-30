/* eslint-disable no-irregular-whitespace */
import dayjs from 'dayjs';
/**
 * 全局脱敏显示
 * @param {String} str 脱敏处理的string
 */
export function globalDesensitized(str) {
    const value = String(str);
    if (!value) return '';
    return value.replace(/./g, '*');
}

/**
 * 处理手机号码脱敏 (中间四位换*)
 * @param {String} mobile 手机号
 */
export function hideMobile(mobile) {
    if (!mobile) return '';
    return `${mobile.substr(0, 3)}****${mobile.substr(-4)}`;
}

/**
 * @time 时间单位转化
 * @param {String} transformType 转化类型 date：转成日期格式 其他转换成时间戳格式
 * @param {Number｜String} value 需被转化的时间戳/日期
 */
export function formatTime(value, transformType) {
    let time = '';
    if (!value) {
        return time;
    }
    time = transformType === 'date' ? dayjs(value).unix() : dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    return time;
}

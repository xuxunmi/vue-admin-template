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

/**
 * 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    return Array.from(new Set(arr));
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

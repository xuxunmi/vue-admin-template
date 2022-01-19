/**
 * 获取localStorage or sessionStorage指定key
 * @param {String} value 要获取的key值
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export function get(key, isSession) {
    try {
        var string = isSession ? window.sessionStorage.getItem('' + key) : window.localStorage.getItem('' + key);
        var value = JSON.parse(string);
        return value;
    } catch (error) {
        return null;
    }
}

/**
 * 设置localStorage or sessionStorage
 * @param {String} key 要设置的key值
 * @param {String} value 对应的value值
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export function set(key, value, isSession) {
    try {
        if (isSession) {
            window.sessionStorage.setItem('' + key, JSON.stringify(value));
        } else {
            window.localStorage.setItem('' + key, JSON.stringify(value));
        }
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 删除localStorage or sessionStorage指定key
 * @param {String} value 要获取的key值
 * @param {Boolean} isSession 为true，删除sessionStorage；否则删除localStorage
 */
export function remove(key, isSession) {
    try {
        isSession ? window.sessionStorage.removeItem('' + key) : window.localStorage.removeItem('' + key);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 遍历所有localStorage or sessionStorage
 * @param {Function} callback 回调函数
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 */
export function forEach(callback, isSession) {
    try {
        Object.keys(isSession ? window.sessionStorage : window.localStorage).forEach(function (key, index) {
            var value = get(key, isSession);
            callback(key, value, index);
        });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 获取localStorage or sessionStorage中所有key的数组
 * @param {Boolean} isSession 为true，获取sessionStorage；否则获取localStorage
 * @returns {Array}
 */
export function keys(isSession) {
    try {
        return Object.keys(isSession ? window.sessionStorage : window.localStorage).map(function (key) {
            return key;
        });
    } catch (error) {
        return [];
    }
}

// 使用
// import { get as getStorage, set as setStrorage, remove as removeStorage } from '@/utils/storage.js';

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
 * @param {Number｜String} value 需被转化的时间戳毫秒/日期
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
 * @time 检查url是否为图片路径
 * @param {String} url 图片地址
 */
export function checkIsImgUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

// 获取文件后缀名
export function getFileSuffixName(fileName) {
    var fileNameArray = ('.' + fileName).split('.');
    var filesuffixName = fileNameArray[fileNameArray.length - 1];
    return filesuffixName;
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

/**
 * 将数字转换为金额显示，每三位逗号隔开
 * @method moneyFormat
 * @param {Number} money 数字
 * @param {Number} decimal 小数位
 * @param {string} symbol 金额前缀，如￥或$
 */
export function moneyFormat(money, decimal, symbol) {
    if ((!money || isNaN(money)) && money != 0) return '';
    var num = parseFloat(money);
    num = String(num.toFixed(decimal ? decimal : 0));
    var re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
        num = num.replace(re, '$1,$2');
    }
    return symbol ? symbol + num : num;
}

// 区分浏览器类型
export function distinguishUserAgentUtils(userAgent) {
    let ua = userAgent || window.navigator.userAgent;
    return {
        isEdge: ua.includes('Edge'),
        isFF: ua.includes('Firefox'),
        isOpera: ua.includes('Opera'),
        isBB: ua.includes('BlackBerry'),
        isChrome: ua.includes('Chrome'),
        isMaxthon: ua.includes('Maxthon'),
        isIos: /(iPhone|iPad|iPod|iOS)/i.test(ua),
        isSafari: ua.includes('Safari') && !ua.includes('Chrome'),
        isIE: ua.includes('compatible') && ua.includes('MSIE') && !ua.includes('Opera'),
        isMobile: /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(ua),
        isWeixin: ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
        isWeibo: ua.toLowerCase().match(/WeiBo/i) == 'weibo',
        isWxwork: ua.toLowerCase().match(/wxwork/i) == 'wxwork',
        isQQ: ua.toLowerCase().match(/QQ/i) == 'qq',
        isAndroidApp: ua.toLowerCase() == 'android_app/1.0.0',
        isAndroid:
            (ua.toLowerCase().match(/android/i) == 'android' || ua.toLowerCase().match(/adr/i) == 'adr') &&
            ua.toLowerCase() != 'android_app/1.0.0'
    };
}

// 手机校验
export function mobileCheck(value) {
    value = value.trim();
    const domestic = /^1[3456789][0-9]{9}$/;
    const foreign = /^\+[0-9]{1,20}$/;
    return domestic.test(value) || foreign.test(value);
}

// 邮箱校验
export function emailCheck(str) {
    // eslint-disable-next-line no-useless-escape
    const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

// 身份证校验
export function idNumCheck(str) {
    const _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
    if (_IDRe18.test(str) || _IDre15.test(str)) {
        return true;
    }
    return false;
}

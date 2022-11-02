/* eslint-disable no-irregular-whitespace */
import dayjs from 'dayjs';
import * as CryptoJS from 'crypto-js';

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
 * 数组去重方法1
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('type error!');
    }
    return Array.from(new Set(arr));
}

/**
 * 数组去重方法2
 * @param {arr} Array
 */
export function uniqueArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('type error!');
    }
    if (arr.length == 1) {
        return arr;
    }
    return [...new Set(arr)];
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

/**
 * 千分位格式化，每三位逗号隔开
 * @method formatMoney
 * @param {Number} num 数字
 */
// 第一种方式：
export function formatMoney(num) {
    if ((!num || isNaN(num)) && num != 0) return;
    return num.replace(new RegExp(`(?!^)(?=(\\d{3})+${num.includes('.') ? '\\.' : '$'})`, 'g'), ',');
}
// 第二种方式：
export function toThousandslsFormat(num) {
    if ((!num || isNaN(num)) && num != 0) return;
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * 去除千分位格式化
 * @param {String} num
 */
export function delcommafy(num) {
    if (!num) return num;
    num = num.toString();
    num = num.replace(/,/gi, '');
    return num;
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

// 保留到小数点以后n位
// 保留小数点以后几位，默认2位
export function cutNumber(number, digit = 2) {
    if (typeof number != 'number') {
        number = Number(number);
    }
    return Number(number.toFixed(digit));
}

/**
 * 复制内容到剪贴板
 * @param {value} 复制内容
 */
export function copyToBoard(value) {
    const element = document.createElement('textarea');
    document.body.appendChild(element);
    element.value = value;
    element.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        document.body.removeChild(element);
        return true;
    }
    document.body.removeChild(element);
    return false;
}
// 使用：copyToBoard('复制内容...');
// 原理：
//     创建一个textare元素并调用select()方法选中
//     document.execCommand('copy')方法，拷贝当前选中内容到剪贴板。

/**
 *浅拷贝
 * @export
 * @param {obj} Object
 * @returns
 */
export function shallowCopy(obj) {
    if (!obj || typeof obj !== 'object') return;
    let newObj = {};
    //遍历oldObj中每个属性
    for (let key in obj) {
        //每遍历一个属性，都给newObj强行赋值一个相同的属性名，相同属性值的新属性
        newObj[key] = obj[key];
    }
    //返回新对象
    return newObj;
}

/**
 *深拷贝
 * @export
 * @param {obj} Object
 * @returns
 */
export function deepCopy(obj) {
    if (!obj || typeof obj !== 'object') return;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // 新版本的ESLint使用了禁止直接调用 Object.prototypes 的内置属性开关
        // if (obj.hasOwnProperty(key)) {
        //     newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        // }
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

/**
 * 生成随机id/随机字符串
 * @param {*} length
 * @param {*} chars
 * //第一个参数指定位数，第二个字符串指定字符，都是可选参数，如果都不传，默认生成8位
 */
export function randomString(length, chars) {
    chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    length = length || 8;
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * 生成随机颜色
 */
export const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

/**
 * @returns 生成随机十六进制
 */
export const randomHexColor = () =>
    `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')}`;

/**
 * 动态插入css
 */

export const dynamicCSS = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};

/**
 * 设置全局灰度模式
 */
export const toggleGrayMode = status => {
    if (status) {
        document.body.className = document.body.className + ' grayMode';
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};

/**
 * 设置全局主题
 */
export const setTheme = name => {
    document.body.className = name;
};

/**
 *加密处理
 */
export const encryption = params => {
    let { data, type, param, key } = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        });
    } else {
        param.forEach(ele => {
            var data = result[ele];
            key = CryptoJS.enc.Latin1.parse(key);
            var iv = key;
            // 加密
            var encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            });
            result[ele] = encrypted.toString();
        });
    }
    return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};

/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
    function listen() {
        callback();
    }

    document.addEventListener('fullscreenchange', function () {
        listen();
    });
    document.addEventListener('mozfullscreenchange', function () {
        listen();
    });
    document.addEventListener('webkitfullscreenchange', function () {
        listen();
    });
    document.addEventListener('msfullscreenchange', function () {
        listen();
    });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};

/**
 * 是否是数字
 * @param {*} value
 * @returns
 */
export function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

/**
 * 保留指定位小数
 * @param {*} src
 * @param {*} pos
 * @returns
 */
export function formatFloat(src, pos = 2) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

/**
 * 将树结构数组转换成数组的形式,传入tree数据，返回array数据
 * @param {treeList} Array
 */
export function treeToArray(treeList) {
    let arr = [];
    const expanded = datas => {
        if (datas && datas.length > 0) {
            datas.forEach(e => {
                arr.push(e);
                expanded(e.children);
            });
        }
    };
    expanded(treeList);
    return arr;
}

/**
 * 两日期之间相差的天数
 */
export const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

// 使用：dayDiff(new Date('2021-10-21'), new Date('2022-02-12'));

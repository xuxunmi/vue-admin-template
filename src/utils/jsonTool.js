/**
 * json数据下划线转驼峰和驼峰转下划线
 * @param {Object} source , isHump true:转驼峰,false:转下划线
 * @returns {Object}
 */
export default function jsonTool(source, isHump = true) {
    if (!source || typeof source !== 'object') {
        return source;
    } else {
        const targetObj = source.constructor === Array ? [] : {};
        Object.keys(source).forEach(keys => {
            const exp = isHump ? /_[a-z]{1}|_/g : /[A-Z]/g;
            const newKeys = keys.replace(exp, (tag, index) => {
                return isHump ? (tag === '_' ? '' : keys.charAt(index + 1).toUpperCase()) : '_' + tag.toLowerCase();
            });
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[newKeys] = jsonTool(source[keys], isHump);
            } else {
                targetObj[newKeys] = source[keys];
            }
        });
        return targetObj;
    }
}

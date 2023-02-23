// 配置编译环境和线上环境之间的切换
const env = process.env;
const baseUrl = '';
// iconfont图标库css链接
//at.alicdn.com/t/c/font_3282173_an1qfqedkg4.css
const iconfontVersion = ['3282173_an1qfqedkg4'];
const iconfontUrl = `//at.alicdn.com/t/c/font_$key.css`;

export { baseUrl, iconfontUrl, iconfontVersion, env };

const enhanceLogOption = {
    preTip: '🐖🐖🐖🐖🐖🐖🐖🐖🐖🐖', // 打印的前缀提示，方便快速找到log，默认为🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
    splitBy: '', // 每个参数分隔符，默认空字符串，可以使用换行符\n
    endLine: false // 是否需要endLine
};

let config = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        ['enhance-log', enhanceLogOption] // 配置babel-plugin-enhance-log插件，用于console.log
    ]
};

// 在生产环境中 bulid  去除报错：
// Unexpected console statement (no-console) 去除 console 中的插件
if (process.env.NODE_ENV === 'production') {
    config.plugins.push('transform-remove-console');
}

module.exports = config;

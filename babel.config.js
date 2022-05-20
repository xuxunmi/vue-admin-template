let config = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ]
};

// 在生产环境中 bulid  去除报错：
// Unexpected console statement (no-console) 去除 console 中的插件
if (process.env.NODE_ENV === 'production') {
    config.plugins.push('transform-remove-console');
}

module.exports = config;

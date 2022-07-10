module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        // PC端/移动端适配方案
        'postcss-px-to-viewport': {
            unitToConvert: 'px', // 需要转换的单位，默认为px
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 要进行转换的属性列表，'*'表示匹配所有，'!'表示不转换
            viewportUnit: 'vw', // 转换后的视口单位
            fontViewportUnit: 'vw', // 转换后字体使用的视口单位
            selectorBlackList: [], // 不进行转换的css选择器，继续使用原有单位，
            minPixelValue: 1, // 设置最小的转换数值，默认值1，小于或等于1px则不进行转换
            mediaQuery: false, //  设置媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否处理横屏情况
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1920 // 横屏时使用的视口宽度
        }
    }
};

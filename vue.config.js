// const webpack = require('webpack')
const path = require('path');
// 压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    // 静态文件基本路径
    publicPath: './',
    // 构建输出文件目录
    outputDir: 'dist',
    // 放置静态资源的目录
    assetsDir: './vue-static',
    // html输出路径，Default: 'index.html'
    indexPath: 'index.html',
    // 文件哈希名
    filenameHashing: false,
    // 保存时是否使用`eslint-loader`进行检查
    lintOnSave: true,
    // 生产环境是否要生成 sourceMap
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    devServer: {
        https: false,
        open: false, // 是否自动启动浏览器
        host: '0.0.0.0', // 允许任意电脑ip访问
        port: 9527,
        proxy: {
            '/api': {
                // 请求前添加的路径，会代替target网址请求
                target: 'http://192.168.11.46:8085/', // 代理服务器地址
                changeOrigin: true, // 是否跨域
                ws: true, // 是否启用websockets
                secure: false, // 使用的是http协议设为false，https协议设为true
                pathRewrite: {
                    // 路径重写
                    '^/api': '/'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // 配置全局样式变量
                implementation: require('sass'),
                additionalData: `@import "@/styles/variables.scss";`
            }
        }
    },
    chainWebpack: config => {
        // 路径重命名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@assets', resolve('src/assets'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@api', resolve('src/api'));

        // 生产环境配置
        if (process.env.NODE_ENV === 'production') {
            // 生产环境下，删除console和debugger
            config.optimization
                .minimize(true)
                .minimizer('terser')
                .tap(args => {
                    const { terserOptions } = args[0];
                    terserOptions.compress.drop_console = true;
                    terserOptions.compress.drop_debugger = true;
                    return args;
                });

            config.optimization.splitChunks({
                cacheGroups: {
                    common: {
                        name: 'common',
                        chunks: 'all',
                        minSize: 1,
                        minChunks: 2,
                        priority: 1
                    },
                    vendor: {
                        name: 'chunk-libs',
                        chunks: 'all',
                        // eslint-disable-next-line no-useless-escape
                        test: /[\/]node_modules[\/]/,
                        priority: 10
                    }
                }
            });
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: /\.js$|\.html$|\.json$|\.css$/,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        } else {
            // 为开发环境修改配置...
        }
    }
};

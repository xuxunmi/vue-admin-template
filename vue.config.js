// const webpack = require('webpack')
// const path = require('path')
// 压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: './vue-static',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    https: false,
    open: false, // 是否自动启动浏览器
    host: '0.0.0.0', // 允许任意电脑ip访问
    port: 8080,
    proxy: {
      '/api': {
        // 请求前添加的路径，会代替target网址请求
        // target: 'http://192.168.0.119:8080/',
        target: 'http://192.168.11.46:8085/', // w 代理服务器地址
        // target: 'http://192.168.11.56:82/', //g 代理服务器地址
        // target: 'http://192.168.11.236:39002/', // t 代理服务器地址
        changeOrigin: true, // 是否跨域
        ws: true,
        pathRewrite: {
          // 路径重写
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    } else {
      // 为开发环境修改配置...
    }
  }

  // chainWebpack: config => {
  //     config.plugin('provide').use(webpack.ProvidePlugin, [
  //         {
  //             $: 'jquery',
  //             jquery: 'jquery',
  //             jQuery: 'jquery',
  //             'window.jQuery': 'jquery'
  //         }
  //     ])
  // }
}

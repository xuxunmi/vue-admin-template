import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import '@/styles/global.css';
import '@/mock/index.js';

// 引入bpmn-js的css
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import { dynamicCSS } from '@/utils/tools.js';
import * as urls from "@/config/env";
import { iconfontUrl, iconfontVersion } from "@/config/env";

// 阻止启动生产消息
Vue.config.productionTip = false;

// vue-devtools 浏览器开发调试
Vue.config.devtools = true;

// 加载相关url地址
// Object.keys(urls).forEach(key => {
//     console.log('urls: ', urls);
//     Vue.prototype[key] = urls[key];
// });

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    console.log(iconfontUrl.replace("$key", ele));
    dynamicCSS(iconfontUrl.replace("$key", ele));
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

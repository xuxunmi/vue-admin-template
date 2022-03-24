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

// // 流程设计器全局样式
// import '@/components/Bpmn/css/vue-bmpn.css';

Vue.config.productionTip = false;

// vue-devtools 浏览器开发调试
Vue.config.devtools = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

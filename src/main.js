import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import '@/styles/global.css';

Vue.config.productionTip = false;

// vue-devtools 浏览器开发调试
Vue.config.devtools = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

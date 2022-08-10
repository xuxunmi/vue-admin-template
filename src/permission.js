import router from './router';
import store from './store';
import { get as getStorage } from '@/utils/storage.js';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

NProgress.configure({ showSpinner: false }); // 进度环隐藏

let isRefresh = false; //判断是否是刷新页面进入的守卫

//无需权限页面
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
    NProgress.start(); // 进度条开始

    let isLogin = store.getters.token || getStorage('token', true);
    if (isLogin) {
        if (to.path === '/login') {
            next();
            NProgress.done();
        } else {
            if (store.getters.menuList.length === 0 || !isRefresh) {
                await store.dispatch('permission/setMenuList');
                isRefresh = true;
                next({ ...to, replace: true });
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next({
                path: '/login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: { redirect: to.fullPath }
            });
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束进度条
});

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    const isLogin = store.getters.token; // 是否登录
    if (isLogin) {
        if (to.path === '/login') {
            next({ path: '/home' });
        }
    } else {
        if (to.path !== '/login' && to.path !== '/forget') {
            next({ path: '/login' });
        }
    }
    next();
});

export default router;

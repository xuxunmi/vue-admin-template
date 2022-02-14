import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store/index.js';
import Layout from '@/views/Layout/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home',
                    requireAuth: true
                }
            },
            {
                path: '/user',
                name: '用户信息',
                component: { render: e => e('router-view') },
                meta: {
                    title: '用户信息',
                    icon: 'el-icon-user-solid'
                },
                children: [
                    {
                        path: '/user/luckydraw',
                        name: 'LuckyDraw',
                        component: () => import('@/views/User/LuckyDraw/index.vue'),
                        meta: {
                            title: '抽奖功能',
                            icon: 'el-icon-present',
                            requireAuth: true
                        }
                    }
                ]
            },
            {
                path: '/system',
                name: '系统管理',
                component: { render: e => e('router-view') },
                meta: {
                    title: '系统管理',
                    icon: 'el-icon-s-tools'
                },
                children: [
                    {
                        path: '/system/user',
                        name: 'UserManage',
                        component: () => import('@/views/SystemManage/UserManage/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'el-icon-s-custom',
                            requireAuth: true
                        }
                    }
                ]
            },
            {
                path: '/echarts',
                name: 'Echarts图表',
                component: { render: e => e('router-view') },
                meta: {
                    title: 'Echarts图表',
                    icon: 'el-icon-s-tools'
                },
                children: [
                    {
                        path: '/echarts/linepiechart',
                        name: 'Linepiechart',
                        component: () =>import('@/views/ECharts/LinePieChart/index.vue'),
                        meta: {
                            title: '折线饼图',
                            icon: 'el-icon-s-custom',
                            requireAuth: true
                        }
                    }
                ]

            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
        hidden: true,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import('@/views/Forget/index.vue'),
        hidden: true,
        meta: {
            title: '忘记密码'
        }
    }
];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     // 判断该路由是否需要登录权限
//     if (to.meta.requireAuth) {
//         // 是否有token
//         let isLogin = store.getters.token || '';
//         if (isLogin) {
//             next();
//         } else {
//             if (to.path !== '/login' && to.path !== '/forgot') {
//                 next({
//                     path: '/login',
//                     query: { redirect: to.fullPath }
//                 });
//             }
//         }
//     } else {
//         next();
//     }
// });

export default router;

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
                name: 'Home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home'
                }
            },
            {
                path: '/user',
                name: 'User',
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
                            icon: 'el-icon-present'
                        }
                    }
                ]
            },
            {
                path: '/system',
                name: 'System',
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
                            icon: 'el-icon-s-custom'
                        }
                    }
                ]
            },
            {
                path: '/echarts',
                name: 'Echarts',
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
                            icon: 'el-icon-s-custom'
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
//     const isLogin = store.getters.token; // 是否登录
//     if (isLogin) {
//         if (to.path === '/login') {
//             next({ path: '/home' });
//         }
//     } else {
//         if (to.path !== '/login' && to.path !== '/forget') {
//             next({ path: '/login' });
//         }
//     }
//     next();
// });

export default router;

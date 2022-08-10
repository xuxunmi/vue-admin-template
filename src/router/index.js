import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { get as getStorage } from '@/utils/storage.js';

import Layout from '@/views/Layout/index.vue';

Vue.use(VueRouter);

const constantRoutes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'icon-shouye1',
                    requireAuth: true
                }
            },
            {
                path: '/table_plus',
                name: 'TablePlus',
                component: () => import('@/views/TablePlus/index.vue'),
                meta: {
                    title: '自定义表格',
                    icon: 'icon-shouye1',
                    requireAuth: true
                }
            },
            {
                path: '/user',
                name: '用户管理',
                component: { render: e => e('router-view') },
                meta: {
                    title: '用户管理',
                    icon: 'icon-yonghuguanli1'
                },
                children: [
                    {
                        path: '/user/luckydraw',
                        name: 'LuckyDraw',
                        component: () => import('@/views/UserManage/LuckyDraw/index.vue'),
                        meta: {
                            title: '抽奖功能',
                            icon: 'icon-choujiang1',
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
                    icon: 'icon-xitongguanli1'
                },
                children: [
                    {
                        path: '/system/vuextable',
                        name: 'vuexTable',
                        component: () => import('@/views/SystemManage/VuexTable/index.vue'),
                        meta: {
                            title: 'vuex-table表格',
                            icon: 'icon-24gf-table',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/system/iconfont',
                        name: 'Iconfont',
                        component: () => import('@/views/SystemManage/Iconfont/index.vue'),
                        meta: {
                            title: 'iconfont图标',
                            icon: 'icon-tubiao',
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
                    icon: 'icon-tubiao2'
                },
                children: [
                    {
                        path: '/echarts/linepiechart',
                        name: 'Linepiechart',
                        component: () => import('@/views/ECharts/LinePieChart/index.vue'),
                        meta: {
                            title: '折线饼图',
                            icon: 'icon-shuju1',
                            requireAuth: true
                        }
                    }
                ]
            },
            {
                path: '/tools',
                name: '工具管理',
                component: { render: e => e('router-view') },
                meta: {
                    title: '工具管理',
                    icon: 'icon-gongju1'
                },
                children: [
                    {
                        path: '/tools/process_design',
                        name: 'processDesign',
                        component: () => import('@/views/Process/Design/index.vue'),
                        meta: {
                            title: '流程设计',
                            icon: 'icon-liuchengsheji',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/tools/formula_editor',
                        name: 'formulaEditor',
                        component: () => import('@/views/Process/FormulaEditor/index.vue'),
                        meta: {
                            title: '公式编辑',
                            icon: 'icon-bianji1',
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

/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/user',
        name: '用户管理',
        component: { render: e => e('router-view') },
        meta: {
            title: '用户管理',
            icon: 'icon-yonghuguanli1'
        },
        children: [
            {
                path: '/user/luckydraw',
                name: 'LuckyDraw',
                component: () => import('@/views/UserManage/LuckyDraw/index.vue'),
                meta: {
                    title: '抽奖功能',
                    icon: 'icon-choujiang1',
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
            icon: 'icon-xitongguanli1'
        },
        children: [
            {
                path: '/system/vuextable',
                name: 'vuexTable',
                component: () => import('@/views/SystemManage/VuexTable/index.vue'),
                meta: {
                    title: 'vuex-table表格',
                    icon: 'icon-24gf-table',
                    requireAuth: true
                }
            },
            {
                path: '/system/iconfont',
                name: 'Iconfont',
                component: () => import('@/views/SystemManage/Iconfont/index.vue'),
                meta: {
                    title: 'iconfont图标',
                    icon: 'icon-tubiao',
                    requireAuth: true
                }
            }
        ]
    }
];

const router = new VueRouter({
    // mode: 'history',  //去掉url中的#，需要后端配合
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        //meta.requireAuth为true时，表示进入该路由需要进行登录权限验证
        let isLogin = store.getters.token || getStorage('token', true);
        if (isLogin) {
            next();
        } else {
            if (to.path !== '/login' && to.path !== '/forget') {
                next({
                    path: '/login',
                    // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    query: { redirect: to.fullPath }
                });
            }
        }
    } else {
        next();
    }
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { get as getStorage } from '@/utils/storage.js';

import Layout from '@/views/Layout/index.vue';
import Index from '@/views/Index/index.vue';

Vue.use(VueRouter);

const constantRoutes = [
    // {
    //     path: '/',
    //     redirect: '/home',
    //     component: () => import('@/views/Home/index.vue')
    // },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('@/views/Home/index.vue'),
    //     meta: {
    //         title: '首页',
    //         requireAuth: true
    //     }
    // },
    {
        path: '/',
        name: 'Layout',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'icon-shouye1',
                    requireAuth: true
                }
            },
            {
                path: '/table_plus',
                name: 'tablePlus',
                component: () => import('@/views/TablePlus/index.vue'),
                meta: {
                    title: '自定义表格',
                    icon: 'icon-shouye1',
                    requireAuth: true
                }
            },
            {
                path: '/user',
                name: 'userManage',
                component: Index,
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
                    },
                    {
                        path: '/user/codeRain',
                        name: 'CodeRain',
                        component: () => import('@/views/UserManage/CodeRain/index.vue'),
                        meta: {
                            title: '代码雨',
                            icon: 'icon-zhongyu',
                            requireAuth: true
                        }
                    }
                ]
            },
            {
                path: '/system',
                name: 'systemManage',
                component: Index,
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
                name: 'echarts',
                component: Index,
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
                path: '/tool',
                name: 'toolManage',
                component: Index,
                meta: {
                    title: '工具管理',
                    icon: 'icon-gongju1'
                },
                children: [
                    {
                        path: '/tool/process_design',
                        name: 'processDesign',
                        component: () => import('@/views/ToolManage/Design/index.vue'),
                        meta: {
                            title: '流程设计',
                            icon: 'icon-liuchengsheji',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/tool/upload',
                        name: 'upload',
                        component: () => import('@/views/ToolManage/Upload/index.vue'),
                        meta: {
                            title: '文件上传',
                            icon: 'icon-shangchuan',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/tool/import_export',
                        name: 'importExport',
                        component: () => import('@/views/ToolManage/importExport/index.vue'),
                        meta: {
                            title: '导入导出',
                            icon: 'icon-daorudaochuguanli',
                            requireAuth: true
                        }
                    },
                    {
                        path: '/tool/tinymce',
                        name: 'tinymce',
                        component: () => import('@/views/ToolManage/TinymceEditor/index.vue'),
                        meta: {
                            title: '富文本编辑器',
                            icon: 'icon-fuwenbenbianjiqi_ziti',
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
        name: 'forget',
        component: () => import('@/views/Forget/index.vue'),
        hidden: true,
        meta: {
            title: '忘记密码'
        }
    }
];

/* 需要权限判断的路由 */
// const dynamicRoutes = [
//     {
//         path: '/user',
//         name: 'userManage',
//         component: Index,
//         meta: {
//             title: '用户管理',
//             icon: 'icon-yonghuguanli1'
//         },
//         children: [
//             {
//                 path: '/user/luckydraw',
//                 name: 'LuckyDraw',
//                 component: () => import('@/views/UserManage/LuckyDraw/index.vue'),
//                 meta: {
//                     title: '抽奖功能',
//                     icon: 'icon-choujiang1',
//                     requireAuth: true
//                 }
//             }
//         ]
//     },
//     {
//         path: '/system',
//         name: 'systemManage',
//         component: Index,
//         meta: {
//             title: '系统管理',
//             icon: 'icon-xitongguanli1'
//         },
//         children: [
//             {
//                 path: '/system/vuextable',
//                 name: 'vuexTable',
//                 component: () => import('@/views/SystemManage/VuexTable/index.vue'),
//                 meta: {
//                     title: 'vuex-table表格',
//                     icon: 'icon-24gf-table',
//                     requireAuth: true
//                 }
//             },
//             {
//                 path: '/system/iconfont',
//                 name: 'Iconfont',
//                 component: () => import('@/views/SystemManage/Iconfont/index.vue'),
//                 meta: {
//                     title: 'iconfont图标',
//                     icon: 'icon-tubiao',
//                     requireAuth: true
//                 }
//             }
//         ]
//     }
// ];

const createRouter = () =>
    new VueRouter({
        // mode: 'history',  //去掉url中的#，需要后端配合
        routes: constantRoutes,
        scrollBehavior: () => ({ y: 0 })
    });

const router = createRouter();

// 解决重复点击当前页面，控制台路由报错问题
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
};

//解决重复登录时重复添加路由 或者 高级权限改低级权限时 某些路由已经注入的问题
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

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

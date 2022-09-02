import { getRouterName, filterRouters } from '@/router/recursionRouter.js';
import dynamicRoutes from '@/router/index.js';
import { getDynamicMenuList } from '@/api/permission/index.js';
import router, { resetRouter } from '@/router/index';

const permission = {
    namespaced: true,
    state: {
        menuList: [] // 左侧菜单列表
    },
    mutations: {
        SET_MENU_LIST(state, menu) {
            state.menuList = menu;
            const home = [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/Home/index.vue'),
                    meta: {
                        title: '首页',
                        requireAuth: true
                    }
                }
            ];
            // 从动态路由中获取等于home首页的路由
            let newMenu = menu.filter(m => m.name === 'home');
            if (newMenu && newMenu.length > 0) {
                state.menuList = menu;
            } else {
                state.menuList = [...home, ...menu];
            }
        }
    },
    actions: {
        // 设置菜单
        setMenuList({ commit }) {
            return new Promise((resolve, reject) => {
                let params = {
                    appCode: 'sfCost'
                };
                getDynamicMenuList(params)
                    .then(res => {
                        let { code, data } = res;
                        if (code == '200') {
                            // 获取动态路由name
                            const routerNameArr = getRouterName(data);
                            // console.log('routerNameArr: ', routerNameArr);
                            // 根据动态路由name匹配本地路由获取动态路由
                            const addRoutersList = filterRouters(dynamicRoutes, routerNameArr);
                            // 解决路由name重复警告
                            resetRouter();
                            // 添加路由
                            addRoutersList.forEach(item => router.addRoute('layout', item));
                            // // 添加404页面
                            // router.addRoute({ path: '*', redirect: '/404', hidden: true });
                            // 将动态路由存入vuex中
                            commit('SET_MENU_LIST', addRoutersList);
                            resolve(addRoutersList);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            }).catch(error => {
                throw new Error(error);
            });
        }
    }
};

export default permission;

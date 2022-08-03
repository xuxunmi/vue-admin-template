import dynamicRoutes from '@/router/index.js';
import { getDynamicMenuList } from '@/api/permission/index.js';

/**
 *
 * @param  {Array} routers 后台返回的用户权限json
 * @return {Array} nameArr 过滤后返回的路由name
 */
const getRouterName = (routers, nameArr = []) => {
    routers.forEach(item => {
        nameArr.push(item.menuCode);
        if (item.children && item.children.length > 0) {
            getRouterName(item.children, nameArr);
        }
    });
    return nameArr;
};

/**
 * @param  {Array} rouerNames 过滤后的路由name
 * @param  {Array} allDynamicRouter  前端配置好的所有动态路由的集合
 * @return {Array} arr 过滤后返回的路由
 */
const filterRouters = (allDynamicRouter, rouerNames = []) => {
    const arr = allDynamicRouter.filter(item => rouerNames.includes(item.name));
    arr.forEach(citem => {
        if (citem.children && citem.children.length > 0) {
            citem.children = citem.children.filter(value => rouerNames.includes(value.name));
            filterRouters(citem.children, rouerNames);
        }
    });
    return arr;
};

const permission = {
    namespaced: true,
    state: {
        menuList: [] // 左侧菜单列表
    },
    mutations: {
        SET_MENU_LIST(state, menu) {
            // console.log('menu: ', menu);
            state.menuList = menu;
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
                            // // 将动态路由存入vuex中
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

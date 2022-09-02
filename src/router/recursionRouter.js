/**
 *
 * @param  {Array} routers 后台返回的用户权限json
 * @return {Array} nameArr 过滤后返回的路由name
 */
export const getRouterName = (routers, nameArr = []) => {
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
export const filterRouters = (allDynamicRouter, rouerNames = []) => {
    const arr = allDynamicRouter.filter(item => rouerNames.includes(item.name));
    arr.forEach(citem => {
        if (citem.children && citem.children.length > 0) {
            citem.children = citem.children.filter(value => rouerNames.includes(value.name));
            filterRouters(citem.children, rouerNames);
        }
    });
    return arr;
};

const getters = {
    isCollapse: state => state.isCollapse,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    menuList: state => state.permission.menuList,
    internationalFields: state => state.international.internationalFields
};

export default getters;

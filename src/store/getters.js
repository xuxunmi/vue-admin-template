const getters = {
    isCollapse: state => state.isCollapse,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo
};

export default getters;

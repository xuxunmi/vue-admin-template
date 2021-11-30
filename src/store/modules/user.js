import { get as getStorage, set as setStrorage } from '@/utils/storage.js';

const user = {
    // 取别名
    namespaced: true,
    state: {
        // 保存token
        token: getStorage('token', false) || null,
        // 用户信息
        userInfo: getStorage('userInfo', false) || {}
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setStrorage('token', token, false);
        },
        SET_USER_INFO(state, data) {
            setStrorage('userInfo', data, false);
            state.userInfo = data;
        }
    },
    actions: {
        setToken(content, payload) {
            content.commit('SET_TOKEN', payload);
        },
        setUserInfo(content, payload) {
            content.commit('SET_USER_INFO', payload);
        }
    }
};

export default user;

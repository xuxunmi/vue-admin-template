import { get as getStorage, set as setStrorage } from '@/utils/storage.js';

const user = {
    // 取别名
    namespaced: true,
    state: {
        // 保存token
        token: getStorage('token', true) || null,
        // 用户信息
        userInfo: getStorage('userInfo', true) || {}
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setStrorage('token', token, true);
        },
        SET_USER_INFO(state, data) {
            setStrorage('userInfo', data, true);
            state.userInfo = data;
        }
    },
    actions: {
        setToken(content, payload) {
            // console.log('payload: ', payload);
            content.commit('SET_TOKEN', payload);
        },
        setUserInfo(content, payload) {
            content.commit('SET_USER_INFO', payload);
        }
    }
};

export default user;

import { get as getStorage, set as setStrorage } from '@/utils/storage.js';

const user = {
    // 取别名
    namespaced: true,
    state: {
        // 保存token
        token: getStorage('token', false) || null
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setStrorage('token', token, false);
        }
    },
    actions: {
        setToken(content, payload) {
            console.log(content);
            content.commit('SET_TOKEN', payload);
        }
    }
};

export default user;

import { getInternationalFields } from '@/api/permission/index.js';
import { set as setStorage } from '@/utils/storage.js';

const international = {
    namespaced: true,
    state: {
        internationalFields: {} // 中英文国际化语言
    },
    mutations: {
        SET_INTERNATIONAL_FIELDS(state, data) {
            state.internationalFields = data;
            setStorage('internationalFields', data, false);
        }
    },
    actions: {
        setInternationalFields({ commit }, payload) {
            return new Promise((resolve, reject) => {
                getInternationalFields()
                    .then(res => {
                        let { code, data } = res;
                        if (code === 200) {
                            commit('SET_INTERNATIONAL_FIELDS', data);
                            if (payload) window.location.reload();
                        }
                        resolve(data);
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

export default international;

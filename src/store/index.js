import Vue from 'vue';
import Vuex from 'vuex';
// 模块
import user from './modules/user.js';
import getters from './getters';

import { createVuexPersistedState } from 'vue-persistedstate';

Vue.use(Vuex);

const state = {
    isCollapse: false,
    // tags标签
    tagsList: []
};

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
    },
    delTagsItem(state, data) {
        state.tagsList.splice(data.index, 1);
    },
    setTagsItem(state, data) {
        state.tagsList.push(data);
    },
    clearTags(state) {
        state.tagsList = [];
    },
    closeTagsOther(state, data) {
        state.tagsList = data;
    },
    closeCurrentTag(state, data) {
        for (let i = 0, len = state.tagsList.length; i < len; i++) {
            const item = state.tagsList[i];
            if (item.path === data.$route.fullPath) {
                if (i < len - 1) {
                    data.$router.push(state.tagsList[i + 1].path);
                } else if (i > 0) {
                    data.$router.push(state.tagsList[i - 1].path);
                } else {
                    data.$router.push('/home');
                }
                state.tagsList.splice(i, 1);
                break;
            }
        }
    }
};

const actions = {};

/**
 * @name: createVuexPersistedState
 * @param {key:string}
 * @param {storage}
 * @param {whiteList:Array<string>}
 * @param {blackList:Array<string>}
 * @return {storage}
 */
const persistedState = createVuexPersistedState({
    key: 'vuex',
    storage: window.sessionStorage,
    whiteList: [],
    blackList: []
});

export default new Vuex.Store({
    modules: {
        user
    },
    state,
    getters,
    mutations,
    actions,
    plugins: [persistedState]
});

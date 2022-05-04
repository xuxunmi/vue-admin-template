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
    // 删除标签
    DEL_TAGS(state, data) {
        state.tagsList.splice(data.index, 1);
    },
    // 添加标签
    SET_TAGS(state, data) {
        state.tagsList.push(data);
    },
    // 清空标签
    CLEAR_TAGS(state) {
        state.tagsList = [];
    },
    // 关闭其他标签
    CLOSE_TAGSOther(state, data) {
        state.tagsList = data;
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

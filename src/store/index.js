import Vue from 'vue';
import Vuex from 'vuex';
// 模块
import user from './modules/user.js';
import getters from './getters';

import { createVuexPersistedState } from 'vue-persistedstate';

Vue.use(Vuex);

const state = {
    isCollapse: false
};

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
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

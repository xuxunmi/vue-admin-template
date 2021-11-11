import Vue from 'vue';
import Vuex from 'vuex';
// 模块
import user from './modules/user.js';
import getters from './getters';

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

export default new Vuex.Store({
    modules: {
        user
    },
    state,
    getters,
    mutations,
    actions
});

import store from '@/store';

/**
 * 自动获取焦点指令
 */
const focus = {
    inserted(el) {
        el.querySelector('input').focus();
    }
};

/**
 * 按钮权限
 * 源数据： ["home.sysManage", "car.editDetail", "car.SubmitForReview", "car.PublishAlbum", "home.index", "car.DownloadVehicleCatalog"]
 * 使用：v-permission="'home.index'", 不能用于<template>标签上
 */
const permission = {
    inserted(el, binding) {
        let btnPermission = store.getters.permissionsBtnList;
        if (binding.value) {
            if (!btnPermission.includes(binding.value)) {
                el.parentNode.removeChild(el);
            }
        }
    }
};

const directives = {
    focus,
    permission
};

export default {
    install(Vue) {
        Object.keys(directives).forEach(item => {
            Vue.directive(item, directives[item]);
        });
    }
};

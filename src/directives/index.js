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

/**
 * 拖拽线指令
 * 接收左右容器的最小宽度
 * 使用：v-dropLine="[400,400]"
 *
 * html结构：
 * prev元素定宽
 * next元素宽度自适应，flex:1
 *
 * <div class="flex">
 *      <div class="prev"></div>
 *      <div v-dropLine="[400, 400]" class="drag-line" />
 *      <div class="next"></div>
 * </div>
 *
 *拖拽线css:
 *        .drag-line {
 *            width: 1px;
 *            height: 100%;
 *            background-color: #ddd;
 *            cursor: col-resize;
 *            &:hover {
 *                box-shadow: 0 0 0 1px #409EFF;
 *                background-color: #409EFF;
 *            }
 *        }
 *
 */
const dropLine = {
    inserted(el) {
        let starX, startWidth;
        let preDom = el.previousElementSibling;
        let nextDom = el.nextElementSibling;
        el.onmousedown = e => {
            starX = e.clientX;
            startWidth = preDom.clientWidth;
            e.preventDefault();
            document.onmousemove = e => {
                let width = startWidth + e.clientX - starX;
                if (width > 500) {
                    // 获取拖拽线前一个兄弟节点修改宽度
                    preDom.style.width = width + 'px';
                    // 获取拖拽线前一个兄弟节点修改宽度
                    nextDom.style.width = 'calc(100vw - ' + width + 'px)';
                }
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
};

const directives = {
    focus,
    permission,
    dropLine
};

export default {
    install(Vue) {
        Object.keys(directives).forEach(item => {
            Vue.directive(item, directives[item]);
        });
    }
};

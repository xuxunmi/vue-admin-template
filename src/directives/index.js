/**
 * 自动获取焦点指令
 */
const focus = {
    inserted(el) {
        el.querySelector('input').focus();
    }
};

const directives = {
    focus
};

export default {
    install(Vue) {
        Object.keys(directives).forEach(item => {
            Vue.directive(item, directives[item]);
        });
    }
};

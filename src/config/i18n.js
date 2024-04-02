import Vue from 'vue';
// 引入i18n插件
import VueI18n from 'vue-i18n';
// 引入element-ui语言包
import elementEn from 'element-ui/lib/locale/lang/en';
import elementZh from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
// 引入vxeTable语言包
import zhCNTable from 'vxe-table/lib/locale/lang/zh-CN';
import enUSTable from 'vxe-table/lib/locale/lang/en-US';

// 引入本地语言包
import zhLocale from '@/lang/zh_CN.js';
import enLocale from '@/lang/en_US.js';

import { get as getStorage } from '@/utils/storage.js';
import store from '@/store';

const { zh, en } = store.getters.internationalFields || getStorage('internationalFields', false);

Vue.use(VueI18n);

// 配置国际化语言包
const messages = {
    zh_CN: {
        ...zhLocale,
        ...elementZh,
        ...zhCNTable,
        ...zh
    },
    'en-US': {
        ...enLocale, // 本地文本语言包
        ...elementEn, // element-ui语言包
        ...enUSTable, // 引入vuexTable语言
        ...en
    }
};
// 配置i18n
const i18n = new VueI18n({
    locale: getStorage('lang', false) || 'zh_CN',
    messages,
    silentTranslationWarn: true
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言包
import {en} from './Modules/en-us';
import {zh} from './Modules/zh-cn';

const resources = {
    en: en,
    zh: zh
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'zh', // 备用语言
    interpolation: {
        escapeValue: false // React 自动转义，不需要额外处理
    }
});

export default i18n;
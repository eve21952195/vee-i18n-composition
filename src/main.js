// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import i18n from "./i18n";

//--------------
import{ Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'

// 引入 VeeValidate 的驗證規則
import AllRules from '@vee-validate/rules';

// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';

// 引入 vee-validate 語言包 (可以引入自己的來源，或是使用 @vee-validate/i18n 內部預設已經有的語言包。)
import zh from './language/zh.json'
import ja from './language/ja.json' 
import en from './language/en.json'

// defineRule 注册所有規則
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });


// 洗資料
function extractMessages(originData) {
    return JSON.parse(JSON.stringify(originData)).common
}

// Vee-Validate 的全局配置
configure({
    generateMessage: localize({ja: extractMessages(ja), zh_TW: extractMessages(zh), en: extractMessages(en)}),
    validateOnInput: true
})

// 設定預設語系
setLocale('zh_TW')





createApp(App)
    .use(i18n)
    .component('Form', Form)
    .component('Field', Field)
    .component('ErrorMessage', ErrorMessage)
    .mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入flexible
import 'amfe-flexible';
// 导入路由表
import router from './router';
// 导入存储库
import store from './store/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

// 使用路由
app.use(router);
// 使用存储库
app.use(store);
// 使用element-plus
app.use(ElementPlus)

app.mount('#app');
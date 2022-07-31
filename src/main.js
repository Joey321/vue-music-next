import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式文件
// 引入实体的scss文件 变量函数这些可以在vue.config.js中引入
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).mount('#app')

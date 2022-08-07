import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
// 引入并全局注册指令
import loadingDirective from './components/base/loading/directive'

// 引入全局样式文件
// 引入实体的scss文件 变量函数这些可以在vue.config.js中引入
import '@/assets/scss/index.scss'

const app = createApp(App)
app.use(store).use(router).use(lazyPlugin, {
  loading: require('./assets/images/default.png'),
  error: require('./assets/images/default.png')
}).directive('loading', loadingDirective).mount('#app')

// import Loading from './loading'
// import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

// const loadingDirective = createLoadingLikeDirective(Loading)

// 编写指令对象
// 将loading组件的DOM动态插入到指令作用的DOM对象上
import { createApp } from 'vue'
import Loading from './Loading'

const loadingDirective = {
  mounted (el, binding) {
    // app对象的根组件就是Loading组件
    const app = createApp(Loading)
    // Loading组件的实例
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

// 挂载操作
function append (el) {
  // Loading组件实例对应的DOM对象
  el.appendChild(el.instance.$el)
  // 待优化：Loading组件是通过相对定位到父组件，要求父组件为非static的布局
  // 添加样式逻辑
}
// 移除操作
function remove (el) {
  el.removeChild(el.instance.$el)
}

// export default loadingDirective
export default loadingDirective

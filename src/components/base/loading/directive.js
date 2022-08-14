// import Loading from './loading'
// import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

// const loadingDirective = createLoadingLikeDirective(Loading)

// 编写指令对象
// 将Loading组件的DOM动态插入到指令作用的DOM对象上
import { createApp } from 'vue'
import Loading from './Loading'
import { addClass, removeClass } from '@/assets/js/dom'
const relativeCls = 'g-relative'

const loadingDirective = {
  mounted (el, binding) {
    // console.log(el, '---el')
    // console.log(binding, '---binding')
    // app对象的根组件就是Loading组件
    const app = createApp(Loading)
    // Loading组件的实例
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    // 优化点2：支持修改Loading组件显示的title
    // binding.arg拿到动态参数
    const title = binding.arg
    if (typeof title !== 'undefined') {
      // Loading组件中已经定义了setTitle
      instance.setTitle(title)
    }
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    const title = binding.arg
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

// 挂载操作
function append (el) {
  // 优化点1：Loading组件是通过相对定位到父组件，要求父组件position为非static的布局
  const style = getComputedStyle(el)
  if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
  }
  // Loading组件实例对应的DOM对象
  el.appendChild(el.instance.$el)
}
// 移除操作
function remove (el) {
  removeClass(el, relativeCls)
  el.removeChild(el.instance.$el)
}

// export default loadingDirective
export default loadingDirective

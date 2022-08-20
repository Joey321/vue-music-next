// 右侧快捷导航逻辑
// 交互逻辑：
// 1.点击切换组:不用为每个li绑定touch事件，只需要为其父元素绑定事件，通过事件委托操作子元素，以提高性能
// 2.滑动切换组

import { computed, ref } from 'vue'

export default function useShortcut (props, groupRef) {
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map(group => group.title)
  })
  // shortcut元素高度
  const ANCHOR_HEIGHT = 18
  // 记录手指初始、移动时的数据
  const touch = {}

  function onShortcutTouchStart (e) {
    touch.y1 = e.touches[0].pageY
    // 为子元素li绑定了data-** 可以通过dataset拿到**
    // 手指按下目标元素索引
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    // 索引偏移量
    // (x|0) === Math.floor(x)
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    // 手指滑动目标元素索引
    const anchorIndex = touch.anchorIndex + delta

    scrollTo(anchorIndex)
  }

  // 根据目标索引滚动到目标元素
  function scrollTo (index) {
    if (isNaN(index)) return
    if (index >= 0 && index <= shortcutList.value.length - 1) {
      // 目标元素DOM
      const targetEl = groupRef.value.children[index]
      // scrollRef.value拿到组件；scrollRef.value.scroll拿到组件暴露的实例
      const scroll = scrollRef.value.scroll
      // 调用实例方法 滚动到指定的目标元素
      scroll.scrollToElement(targetEl, 0)
    }
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    scrollRef
  }
}

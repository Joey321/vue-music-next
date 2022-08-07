import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

// wrapperRef.value不能直接传入，因为setup时取不到wrapperRef.value(DOM)
export default function userSlider (wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)
  // 初始化
  onMounted(() => {
    // wrapperRef.value是传入的容器DOM对象
    const sliderValue = slider.value = new BScroll(wrapperRef.value, {
      // slide配置对象
      slide: true,
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2
    })
    // 当前页将要改变时触发slideWillChange事件
    sliderValue.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX
    })
  })
  // 销毁
  onUnmounted(() => {
    slider.value.destroy()
  })
  return {
    slider,
    currentPageIndex
  }
}

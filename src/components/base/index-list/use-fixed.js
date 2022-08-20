// 计算歌手列表-标题固定层的逻辑

import { ref, watch, nextTick, computed } from 'vue'
export default function useFixed (props) {
  const TITLE_HEIGHT = 30
  // 获取groupRef的DOM以便获取其children(每组li的DOM组成的数组)
  const groupRef = ref(null)
  // 获取组高度数组
  const listHeights = ref([])
  // 获取纵向滚动y值
  const scrollY = ref(0)
  // 当前展示组索引
  const currentIndex = ref(0)
  // 下一组距离当前组的距离
  const distance = ref(0)

  const fixedTitle = computed(() => {
    // console.log(scrollY.value)
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // fixedTitle顶上去的效果样式
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const offset = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${offset}px, 0)`
    }
  })

  // 歌手列表数据变化时计算
  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })
  // 监听纵向滚动y值变化
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    // console.log('listHeightsVal---', listHeightsVal)
    // 初始化时候height push 0 因此最后一组length - 1
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      // 组区间顶部底部进行对比
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      // 说明y值落在区间内
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  // 计算每组区间的高度
  function calculate () {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    // 记录每组区间的高度
    let height = 0
    // 初始化
    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }
  // 自定义事件scroll的处理函数
  // 监听滚动事件 获取纵向滚动位置y值 由scroll组件派发
  function onScroll (pos) {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}

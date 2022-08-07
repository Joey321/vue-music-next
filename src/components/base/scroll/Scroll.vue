<template>
  <div ref="rootRef">
    <slot />
  </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'
export default {
  name: 'm-scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const rootRef = ref(null)
    useScroll(rootRef, props, emit)
    return {
      rootRef
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

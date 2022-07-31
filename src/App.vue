<template>
  <m-header />
  <m-tab />
  <router-view/>
</template>

<script>
import MHeader from '@/components/header/Header.vue'
import MTab from '@/components/tab/Tab.vue'

export default {
  name: 'App',
  components: {
    MHeader,
    MTab
  }
}
</script>
<style lang="scss">

</style>

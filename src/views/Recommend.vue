<template>
  <div>recommend</div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
export default {
  name: 'm-recommend',
  async created () {
    const res = await getRecommend()
    console.log(res)
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="singer-detail">
  <pre>{{singer}}</pre>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song.js'

export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  async created () {
    // 歌曲列表
    const rawSongs = await getSingerDetail(this.singer)
    // 有疑问：此时还未调用processSongs，未处理的歌曲中也有url地址了
    console.log('raw-songs---', rawSongs)
    const songs = await processSongs(rawSongs.songs)
    console.log('songs---', songs)
  }
}
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>

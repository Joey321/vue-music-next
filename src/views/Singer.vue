<template>
  <div class="singer" v-loading:[loadingText]="loading">
    <IndexList :data="singers" @click-singer="clickSinger" />
    <!-- router-view对应SingerDetail -->
    <router-view :singer="clickedSinger" />
  </div>
</template>

<script>
import { getSingerList } from '../service/singer'
import IndexList from '../components/base/index-list/IndexList.vue'

export default {
  name: 'm-singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      loadingText: '你干嘛 哈哈 哎哟~~~',
      clickedSinger: null
    }
  },
  computed: {
    loading () {
      return !this.singers.length
    }
  },
  async created () {
    setTimeout(async () => {
      const res = await getSingerList()
      console.log(res)
      this.singers = res.singers
    }, 500)
  },
  methods: {
    clickSinger (singer) {
      this.clickedSinger = singer
      console.log('clickedSinger---', this.clickedSinger)
      // 跳转到歌手详情页
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>

import { get } from './base'

// 由于QQ音乐限制，url是变化的 因此通过后端提供的/api/getSongsUrl接口单独处理。动态为歌手的每一首歌曲添加url属性
export function processSongs (songs) {
  if (!songs.length) {
    return Promise.reject(songs)
  }
  return get('/api/getSongsUrl', {
    mid: songs.map(song => song.mid)
  }).then(res => {
    console.log('unfiltered-songs-url---', res)
    const map = res.map
    return songs.map(song => {
      // 动态为每首song添加url
      song.url = map[song.mid]
      return song
      // 有'vkey'的url才是可以播放的
    }).filter(song => song.url.indexOf('vkey') > -1)
  })
}

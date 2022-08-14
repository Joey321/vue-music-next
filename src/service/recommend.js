// 轮播图相关请求
import { get } from './base'

// 推荐列表
export function getRecommend () {
  return get('/api/getRecommend')
}

// 热门歌单
export function getAlbum (album) {
  return get('/api/getAlbum', { id: album.id })
}

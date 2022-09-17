import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/SingerDetail.vue')
      }
    ]
  },
  {
    path: '/top-list',
    component: () => import('@/views/Toplist.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

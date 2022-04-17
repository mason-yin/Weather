import { createRouter, createWebHashHistory } from 'vue-router'
import Realtime from '../views/Realtime.vue'
import History from '../views/History'

const routes = [
  {
    path: '/',
    name: 'Realtime',
    component: Realtime
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

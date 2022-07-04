import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/push',
    name: 'Push',
    component: () => import('../components/Push.vue')
  },
  {
    path: '/oneclick',
    name: 'OneClick',
    component: () => import('../components/OneClick.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../components/Test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

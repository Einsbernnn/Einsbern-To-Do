import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
    {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
  }
]

const history = import.meta.env.PROD ? createWebHashHistory() : createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router

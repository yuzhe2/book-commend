import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/views/Home/index.vue'
import BookDetail from '@/views/Detail/index.vue'
import LoginPage from '@/views/login/index.vue'
import RegisterPage from '@/views/register/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/detail',
    component: BookDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

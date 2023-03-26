import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/views/Home/index.vue'
import BookDetail from '@/views/Detail/index.vue'
import BookSort from '@/views/bookSort/index.vue'

import LoginPage from '@/views/login/index.vue'
import RegisterPage from '@/views/register/index.vue'

import BackLogin from '@/views/back/Login/index.vue'

import manageWrap from '@/components/manageWrap/index.vue'
import userManage from '@/views/back/userManage/index.vue'
import bookManage from '@/views/back/bookManage/index.vue'
import sortManage from '@/views/back/sortManage/index.vue'
import borrowManage from '@/views/back/borrowManage/index.vue'

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
    path: '/detail/:id',
    component: BookDetail
  },
  {
    path: '/sort',
    component: BookSort
  },

  {
    path: '/manage/login',
    component: BackLogin
  },
  {
    path: '/manage',
    component: manageWrap,
    children: [
      {
        path: '/manage/user',
        component: userManage
      },
      {
        path: '/manage/sort',
        component: sortManage
      },
      {
        path: '/manage/book',
        component: bookManage
      },
      {
        path: '/manage/borrow',
        component: borrowManage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

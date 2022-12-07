import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import layout from '../components/Layout.vue'

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    hidden: true,
    meta: {
      title: '404'
    }
  }
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: 'home',
    meta: {
      roles: ['admin', 'editor'],
      title: '首页',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页',
          icon: 'el-icon-user',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/users',
    component: layout,
    name: 'users',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: '/users/users',
        name: 'users',
        component: () => import('@/views/users/users'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-user',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/users/all',
        name: 'all',
        component: () => import('@/views/users/all'),
        meta: {
          title: '用户1',
          icon: 'el-icon-s-custom',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/users/admin',
        name: 'admin',
        component: () => import('@/views/users/admin'),
        meta: {
          title: '用户2',
          icon: 'el-icon-s-custom',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: 'roles',
    component: layout,
    children: [
      {
        path: 'roles/roles',
        name: 'roles',
        component: () => import('@/views/roles/roles'),
        meta: {
          title: '权限管理',
          icon: 'el-icon-s-grid',
          roles: ['admin', 'roles']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  // mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constRoutes
})

const originaPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originaPush.call(this, location).catch((err) => err)
}

export default router

import router from './router'
import store from './store'
import { Message } from 'element-ui'

const whiteList = ['/login', '/404']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const hasToken = localStorage.getItem('token')

  // 判断用户是否登录
  if (hasToken) {
    // console.log('有hasToken')
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断用户权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // console.log('hasRoles判断结果', hasRoles)
      if (hasRoles) {
        next()
      } else {
        // console.log('没有用户权限,重新获取用户信息')
        // 获取用户权限并且生成路由表
        try {
          const roles = await store.dispatch('user/getInfo', hasToken)
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )

          for (let i = 0, length = accessRoutes.length; i < length; i += 1) {
            const routemenu = accessRoutes[i]
            router.addRoute(routemenu)
          }
          // console.log(router)
          // router.addRoute(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 权限不足，无法访问
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log('该路由不在白名单内')
      next(`/login?redirect=${to.path}`)
    }
  }
})

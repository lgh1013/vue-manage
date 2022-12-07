import { asyncRoutes, constRoutes } from '@/router/index'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRouters(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouters(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoute: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoute = routes
    state.routes = constRoutes.concat(routes)
    // state.routes = JSON.parse(JSON.stringify(state.routes))
    console.log(state.routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      this.roles = roles.roles
      let accessRoutes
      if (this.roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
        // console.log('构造路由表')
      } else {
        accessRoutes = filterAsyncRouters(asyncRoutes, roles)
      }
      // console.log('accessRouters', JSON.parse(JSON.stringify(accessRoutes)))
      console.log(accessRoutes)
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { getInfo, login, logout } from '@/api/login'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  name: '',
  roles: [],
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    localStorage.setItem('roles', roles)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((res) => {
          // console.log(res)
          this.res = res.data.data
          // console.log(this.res)
          commit('SET_TOKEN', this.res.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          this.res = res.data.data
          console.log(this.res)
          if (!this.res) {
            reject('用户信息获取失败,请重新登录')
          }
          const token = this.res.token
          if (!token || token.length <= 0) {
            reject('用户权限不足')
          }
          // console.log(res)
          commit('SET_ROLES', this.res.roles)
          commit('SET_NAME', this.res.username)
          commit('SET_INTRODUCTION', this.res.introduction)
          resolve(this.res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          localStorage.removeItem('token')
          localStorage.removeItem('roles')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 清除用户信息
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('token')
      localStorage.removeItem('roles')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

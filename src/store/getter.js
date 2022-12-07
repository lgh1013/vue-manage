const getters = {
  token: (state) => state.user.token,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  introduction: (state) => state.user.introduction,
  routes: (state) => state.permission.routes
}

export default getters

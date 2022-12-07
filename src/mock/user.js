const admin = {
  id: '001',
  username: 'admin',
  password: '123456abC',
  roles: ['admin'],
  token: 'admin',
  introduction: '这是管理员',
  permission: [
    {
      path: '/',
      component: 'component/Layout',
      redirect: 'views/home',
      meta: {
        roles: ['admiin', 'editor']
      },
      children: [
        {
          path: 'home',
          component: 'view/home',
          name: 'home',
          meta: {
            title: '首页',
            icon: 'el-icon-user',
            roles: ['admin', 'editor']
          }
        },
        {
          path: '/users',
          component: 'viwes/users/users',
          name: 'users',
          meta: {
            title: '用户管理',
            icon: 'el-icon-user',
            roles: ['admin', 'editor']
          },
          children: [
            {
              path: 'all',
              component: 'views/users/all',
              name: 'all',
              meta: {
                title: '用户1',
                icon: 'el-icon-s-custom',
                roles: ['admin', 'editor']
              }
            },
            {
              path: 'admin',
              component: 'views/users/admin',
              name: 'admin',
              meta: {
                title: '用户2',
                icon: 'el-icon-s-custom',
                roles: ['admin']
              }
            }
          ]
        },
        {
          path: '/roles',
          component: 'views/roles',
          name: 'roles',
          meta: {
            title: '权限管理',
            icon: 'el-icon-s-grid',
            roles: ['admin', 'editor']
          }
        }
      ]
    }
  ]
}

const editor = {
  id: '100',
  username: 'editor',
  password: '123456abC',
  roles: ['editor'],
  token: 'editor',
  introduction: '这是普通用户',
  permission: [
    {
      path: '/',
      component: 'component/Layout',
      redirect: 'views/home',
      meta: {
        roles: ['admiin', 'editor']
      },
      children: [
        {
          path: 'home',
          component: 'view/home',
          name: 'home',
          meta: {
            title: '首页',
            icon: 'el-icon-user',
            roles: ['admin', 'editor']
          }
        },
        {
          path: '/users',
          component: 'viwes/users/users',
          name: 'users',
          meta: {
            title: '用户管理',
            icon: 'el-icon-user',
            roles: ['admin', 'editor']
          },
          children: [
            {
              path: 'all',
              component: 'views/users/all',
              name: 'all',
              meta: {
                title: '用户1',
                icon: 'el-icon-s-custom',
                roles: ['admin', 'editor']
              }
            }
          ]
        },
        {
          path: '/roles',
          component: 'views/roles',
          name: 'roles',
          meta: {
            title: '权限管理',
            icon: 'el-icon-s-grid',
            roles: ['admin', 'editor']
          }
        }
      ]
    }
  ]
}

// 登录
export const login = (config) => {
  const { username, password } = JSON.parse(config.body)
  if (username === admin.username && password === admin.password) {
    const token = admin.token
    return {
      data: {
        code: 20000,
        message: '用户登录成功',
        token
      }
    }
  } else if (username === editor.username && password === editor.password) {
    const token = editor.token
    return {
      data: {
        code: 20000,
        message: '用户登录成功',
        token
      }
    }
  } else {
    return {
      data: {
        code: 40000,
        message: '用户名或密码错误'
      }
    }
  }
}

// 获取用户信息
export const getInfo = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return {
      code: 50000,
      message: '用户信息获取失败，请登录'
    }
  } else if (token === admin.token) {
    return {
      code: '20000',
      message: '用户信息获取成功',
      data: admin
    }
  } else {
    return {
      code: '20000',
      message: '用户信息获取成功',
      data: editor
    }
  }
}

// 退出登录
export const logout = () => {
  return {
    code: 20000,
    message: '用户已退出'
  }
}

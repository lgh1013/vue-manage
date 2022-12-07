<template>
  <div class="container">
    <el-container>
      <!-- aside -->
      <el-aside width="el-menu-vertical-demo:not">
        <el-menu
          default-active="$router.currentRoute.path"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <i class="el-icon-grape"></i>
            <span slot="title">后台管理系统</span>
          </el-menu-item>
          <side-bar
            v-for="menulist in routes"
            :key="menulist.path"
            :item="menulist"
          />
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header -->
        <el-header>
          <div class="left-top">
            <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
              <el-breadcrumb-item
                v-for="item in levelList"
                :key="item.path"
                :to="{ path: item.path }"
                ><span>{{ item.meta.title }}</span></el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <div class="right-top">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout"
                  >退出登录</el-dropdown-item
                >
                <el-dropdown-item @click.native="route"
                  >测试功能</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- main -->
        <el-main>
          <appMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from './SideBar/index.vue'
import appMain from './appMain.vue'
import { mapGetters } from 'vuex'

export default {
  components: { appMain, SideBar },
  data() {
    return {
      isCollapse: false,
      routesItem: [], // 路由表
      levelList: []
    }
  },
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['routes'])
  },
  created() {
    this.route
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    route() {
      this.$message({ message: '功能测试完毕,数据已清除', type: 'success' })
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]
      if (!this.isIndex(first)) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
        this.levelList = matched
      } else {
        this.levelList = [{ path: '/', meta: { title: '首页' } }]
      }
    },
    isIndex(route) {
      const redirect = route & route.redirect
      if (!redirect) {
        return false
      }
      return redirect === '/'
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.el-main {
  padding: 0;
}
.el-container {
  height: 100%;
  padding: 0;
}
.el-aside {
  overflow: hidden;
}
.el-aside .el-menu-vertical-demo {
  height: 100%;
  width: 201px;
}
.changIcon,
.right-top {
  margin: 10px;
}

.el-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}
.left-top {
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-header .left-top {
  font-size: 30px;
  padding: 0;
}
.el-breadcrumb {
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

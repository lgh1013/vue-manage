import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './mock'
import axios from 'axios'
import * as echarts from 'echarts'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

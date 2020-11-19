import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs
axios.defaults.baseURL = "http://api.euiadmin.com/index.php";
// axios.defaults.baseURL = "http://localhost/index.php";
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(VueCookies)
Vue.use(Element)
Vue.config.productionTip = false

import components from './plugins/Component'//加载公共组件
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component('v'+name, components[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

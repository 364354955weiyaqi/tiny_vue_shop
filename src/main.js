import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import Axios from 'axios'

// 配置请求的默认路径
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在请求拦截器中配置请求头，带上token信息
Axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

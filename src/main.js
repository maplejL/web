
'use strict'
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$axios = axios // 全局注册，使用方法为：this.$axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  data () {
    return {
      cartProducts: []
    }
  },
  template: '<App/>'
})

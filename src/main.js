// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.css'
// 引入自己封装的axioshttps请求
// import api from '@/commons/axioshttp.js'
// import axios from '@/commons/https.js'
import axios from 'axios'
import studyaxios from '@/commons/study2http/studyhttp2.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.$api = api
Vue.prototype.axios = axios
Vue.prototype.$studyaxios = studyaxios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  var user = sessionStorage.getItem('user');
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

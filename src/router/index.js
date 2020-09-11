import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/Home.vue'
import Dashboard from '@/page/home/dashboard/Dashboard.vue'
import Article from '@/page/home/dashboard/Dashboard.vue'
import Login from '@/page/login/TheLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

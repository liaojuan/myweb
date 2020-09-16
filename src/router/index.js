import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/Home.vue'
import Dashboard from '@/page/home/dashboard/Dashboard.vue'
import Article from '@/page/home/article/Article.vue'
import Login from '@/page/login/TheLogin.vue'
import PriceList from '@/page/pricelist/PriceList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      name: 'Home',
      component: Home,
      children: [
        { path: 'dashboard', name: '首页', component: Dashboard },
        { path: 'article', name: '文章', component: Article }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pricelist',
      name: 'PriceList',
      component: PriceList
    }
  ]
})

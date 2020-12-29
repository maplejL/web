
import Vue from 'vue'
// eslint-disable-next-line import/no-duplicates
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import product from '@/components/product'
// eslint-disable-next-line import/no-duplicates
import VueRouter from 'vue-router'
import home from '../components/home'
import proDetails from '../components/proDetails'
import topLeft from '../components/topLeft'
import shoppingCart from '../components/shoppingCart'
import buy from '../components/buy'
Vue.use(VueRouter)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: topLeft
    }]
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
      path: '/',
      name: 'topLeft',
      component: topLeft
    }]
  },
  {
    path: '/proDetails',
    name: 'proDetails',
    component: proDetails
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/product',
    name: 'product',
    component: product
  },
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: shoppingCart
  },
  {
    path: '/buy',
    name: 'buy',
    component: buy
  }
  ]
})

export default router

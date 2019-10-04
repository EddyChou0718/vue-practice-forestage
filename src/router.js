import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './views/homePage'
import Product from './views/product'
import Checkout from './views/checkout'
import Purchase from './views/purchase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/product/:itemId',
      name: 'product',
      component: Product
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/purchase/:orderId',
      name: 'purchase',
      component: Purchase
    }
  ]
})

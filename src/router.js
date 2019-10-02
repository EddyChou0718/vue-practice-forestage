import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './views/homePage'
import Product from './views/product'

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
    }
  ]
})

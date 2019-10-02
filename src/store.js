//vue axios
import axios from 'axios';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    pagination: {},
    categories: [],
    category: 0,
    cart: {},
    showCart: false,
    isLoading: false
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, cart) {
      state.cart = cart;
    },
    SHOWCART(state, status) {
      state.showCart = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      })
      state.categories = Array.from(categories);
    },
    CATEGORY(state, payload) {
      state.category = payload;
    }
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context, payload) {
      const api = `${PATH}/api/${APIPATH}/products?page=${payload}`;
      context.commit('LOADING', true);      
      axios.get(api).then((res) => {
          console.log(res.data)
          context.commit('PRODUCTS', res.data.products)
          context.commit('PAGINATION', res.data.pagination)
          context.commit('CATEGORIES', res.data.products)
          context.commit('LOADING', false);
      })
    },
    getCart(context) {
      const api = `${PATH}/api/${APIPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((res) => {
        context.commit('CART', res.data.data);
        context.commit('LOADING', false);
        context.commit('SHOWCART', true)
      })
    },
    delCartItem({commit, dispatch}, payload) {
      const api = `${PATH}/api/${APIPATH}/cart/${payload}`;
      commit('LOADING', true);
      axios.delete(api).then((res) => {
        commit('LOADING', false);
        dispatch('getCart')

      })
    },
    activeCategory(context, payload) {
      context.commit('CATEGORY', payload);
    },
  }
})

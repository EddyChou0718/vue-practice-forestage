//vue axios
import axios from 'axios';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    product: {},
    pagination: {},
    categories: [],
    category: 0,
    cart: {},
    delCartItem: '',
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
    PRODUCT(state, payload) {
      state.product = payload
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
    },
    DELCARTITEM(state, payload) {
      state.delCartItem = payload;
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
    getProduct(context, payload) {
        const api = `${PATH}/api/${APIPATH}/product/${payload}`;
        context.commit('LOADING', true);
        axios.get(api).then((res) => {
            console.log(res.data)
            context.commit('PRODUCT', res.data.product)
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
    addtoCart(context, {id, qty}) {
        const api = `${PATH}/api/${APIPATH}/cart`;
        const cart = {
            product_id: id,
            qty
        };
        axios.post(api, {
            data: cart
        }).then((res) => {
            console.log(res.data)
            context.dispatch('getCart')
        })
    },
    setDelItem(context, payload) {
      context.commit('DELCARTITEM', payload)
    },
    delCartItem({commit, dispatch, state}) {
      const api = `${PATH}/api/${APIPATH}/cart/${state.delCartItem}`;
      commit('LOADING', true);
      axios.delete(api).then((res) => {
        dispatch('getCart')
        dispatch('setDelItem', '')
        commit('LOADING', false);
        console.log(res.data)
      })
    },
    activeCategory(context, payload) {
      context.commit('CATEGORY', payload);
    },
    refreshCart(context) {
      context.commit('CART', '')
    }
  }
})

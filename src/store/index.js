import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:{
      items:[]
    },
    home:{
      title: 'Your source for good food!',
      text: `We’re passionate about our food and take great care that what we serve every day is safe, great quality,
        offers choice and is produced in a responsible way. We use real, quality ingredients to elevate the taste of
        our food and the spirits of people who enjoy it all over the world.`
    },
    foods:{
      data:[]
    },
    user:{
      loggedIn: false
    }
  },
  mutations: {
    // addToCart(state, value){
    //   let found = false
    //   for(let item of state.cart.items){
    //     // om jag redan lagt till ett exemplar
    //     if(item.title === value.title){
    //       item.amount++
    //       found = true
    //       break
    //     }
    //   }
    //   // annars (om det är en ny item)
    //   if(!found){
    //     state.cart.items.push(value)
    //   }
    //   console.log(state.cart.items)
    // },
    setFoodsData(state, value){
      state.foods.data = value
    },
    setUser(state, value){
      state.user = value
    },
    setCart(state, value){
      state.cart.items = value
    }
  },
  actions: {
    async loadFoodsData({commit}){
      let response = await fetch('http://localhost:8080/rest/foods')
      let data = await response.json()
      for(let item of data){
        item.amount = 0 // for the cart
      }
      commit('setFoodsData', data)
    },
    async login({commit}, credentials){
      let response = await fetch('http://localhost:8080/rest/login',{
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      let user = await response.json()
      commit('setUser', user)
    },
    async checkAuth({commit}){
      let response = await fetch('http://localhost:8080/rest/login')
      let user = await response.json()
      commit('setUser', user)
    },
    async addToCart({dispatch}, item){
      let response = await fetch('http://localhost:8080/rest/cart-item',{
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food: item.id,
          amount: 1
        })
      })
      await response.json()
      dispatch('loadCart')
    },
    async loadCart({commit}){
      let cartResponse = await fetch('http://localhost:8080/rest/cart')
      let cartResult = await cartResponse.json()
      commit('setCart', cartResult)
    }
  }
})
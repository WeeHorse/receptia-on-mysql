import Vue from 'vue'
import Vuex from 'vuex'
//import fetch from 'isomorphic-fetch' // för både "normal" klient och testning i cmd line

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
      loggedIn: false,
      first_name: '',
      last_name: '',
      phone: '',
      adress:{
        street:'',
        zip:'',
        city:''
      }
    }
  },
  mutations: {
    setHomeTitle(state, value){
      state.home.title = value
    },
    setHomeText(state, value){
      state.home.text = value
    },
    setFoodsData(state, value){
      state.foods.data = value
    },
    setUser(state, value){
      if(!value.adress){
        value.adress = {}
      }
      state.user = value
    },
    setUserFirstName(state, value){
      state.user.first_name = value
    },
    setUserLastName(state, value){
      state.user.last_name = value
    },
    setUserPhone(state, value){
      state.user.phone = value
    },
    setUserAdress(state, value){
      state.user.adress = value
    },
    setCart(state, value){
      state.cart.items = value
    }
  },
  actions: {
    async loadFoodsData({commit}){
      let response = await fetch('/rest/foods')
      let data = await response.json()
      for(let item of data){
        item.amount = 0 // for the cart
      }
      commit('setFoodsData', data)
    },
    async login({dispatch}, credentials){
      let response = await fetch('/rest/login',{
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      await response.json()
      dispatch('checkAuth')
    },
    async checkAuth({commit}){
      let response = await fetch('/rest/login')
      let data = await response.json()
      let user = data
      commit('setUser', user)
    },
    async addToCart({dispatch}, item){
      let response = await fetch('/rest/cart-item',{
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
      let cartResponse = await fetch('/rest/cart')
      let cartResult = await cartResponse.json()
      commit('setCart', cartResult)
    }
  }
})
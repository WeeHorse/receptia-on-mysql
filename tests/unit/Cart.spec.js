import store from '@/store/index.js'

describe('Cart', ()=>{
  describe('store', ()=>{
    let item = {title:'Some burger', cost: 100}
    let expectedResult = {title:'Some burger', cost: 100, amount: 1}
    test('addToCart', ()=>{
      store.commit('addToCart', item)
      //expect(store.state.cart.items[0]).toEqual(expectedResult)
    })
  })
})


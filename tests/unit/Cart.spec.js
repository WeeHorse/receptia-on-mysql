import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import store from '@/store/index.js'

describe('Cart', ()=>{
  describe('store', ()=>{
    let item = {id: 6, amount: 1}
    let testResponse1 = {"fieldCount":0,"affectedRows":1,"insertId":46,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
    let testResponse2 = [{"id":6,"title":"Mushroom Burger","cost":95,"user":1,"amount":1}]
    test('addToCart', ()=>{
      fetch.mockResponseOnce(JSON.stringify(testResponse1)).mockResponseOnce(JSON.stringify(testResponse2))
      store.dispatch('addToCart', item)
      expect(store.state.cart.items).toEqual(testResponse2)
    })
  })
})


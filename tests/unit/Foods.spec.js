import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import store from '@/store/index.js'

describe('Foods', ()=>{
  describe('store', ()=>{
    let testData = [{
      "id": 11,
      "title": "Big FTlac",
      "text": "The bigger they come the hotter they are",
      "image": "https://www.tifood.se/wp-content/uploads/2019/01/890357-600x600.jpg",
      "cost": 125,
      "category": "burgers"
    }]

    let expectedData = [{
      "id": 11,
      "title": "Big FTlac",
      "text": "The bigger they come the hotter they are",
      "image": "https://www.tifood.se/wp-content/uploads/2019/01/890357-600x600.jpg",
      "cost": 125,
      "category": "burgers",
      "amount": 0
    }]

    test('loadData', async ()=>{
      fetch.mockResponseOnce(JSON.stringify(testData))
      await store.dispatch('loadFoodsData')
      expect(store.state.foods.data).toEqual(expectedData)
    })
  })
  describe('component', ()=>{

  })
})
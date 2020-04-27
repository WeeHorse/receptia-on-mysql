import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import store from '@/store/index.js'

describe('Login', ()=>{
  describe('store', ()=>{
    let testCredentials = {"email":"bob@node.se","password":"abc123"}

    let expectedUserData = {"id":2,"email":"bob@node.se","password":"abc123","first_name":"Bob","last_name":"Node","loggedIn":true}
    expectedUserData.adress = {} // adress is currently set to an empty object following login

    test('loadData', async ()=>{
      fetch.mockResponseOnce(JSON.stringify(expectedUserData))
      await store.dispatch('login', testCredentials)
      expect(store.state.user).toEqual(expectedUserData)
    })
  })
  describe('component', ()=>{

  })
})
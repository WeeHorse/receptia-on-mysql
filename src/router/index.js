import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Foods from '@/views/Foods'

Vue.use(VueRouter)


// ändra här för att lägga till nya routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foods/:food',
    name: 'foods',
    component: Foods
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

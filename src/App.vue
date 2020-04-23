<template>
  <main id="app">
    <header>
      <h1>
        <router-link to="/">RECEPTIA</router-link>
      </h1>
      <Auth></Auth>
      <Cart></Cart>
    </header>
    <router-view />
    <aside>
      <nav>
        <router-link to="/foods/burgers">Burgers</router-link>
        <router-link to="/foods/soups">Soups</router-link>
        <router-link to="/foods/desserts">Desserts</router-link>
      </nav>
    </aside>
  </main>
</template>

<script>
  import Cart from '@/components/Cart'
  import Auth from '@/components/Auth'

  export default {
    components:{
      Cart,
      Auth
    },
    created(){
      // check authentication
      this.$store.dispatch('checkAuth')
      // load cart
      this.$store.dispatch('loadCart')
    }
  }

</script>

<style src="./style.css">
</style>

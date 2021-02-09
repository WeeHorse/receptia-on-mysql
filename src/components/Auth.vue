<template>
  <div>
    <form v-if="!user.loggedIn" @submit="submit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="Login" />
    </form>
    <div v-if="user.loggedIn">
      <h3>Welcome {{user.first_name}} {{user.last_name}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods:{
    submit(e){
      e.preventDefault()
      this.$store.dispatch('login', {email: this.email, password: this.password})
    }
  }
}
</script>

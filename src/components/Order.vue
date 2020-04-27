<template>
  <form class="order">
    <legend>Your details</legend>
    <div>
      <input v-model="first_name" placeholder="Enter your first name" />
      <input v-model="last_name" placeholder="Enter your last name" />
      <input v-model="phone" placeholder="Enter your phone number" />
    </div>
    <div>
      <input v-model="street" placeholder="Enter your shipping adress" />
      <input v-model="zip" placeholder="Enter your shipping zip code" />
      <input v-model="city" placeholder="Enter your shipping city" />
    </div>
    <button class="button" @click="sendOrder">Send order</button>
  </form>
</template>

<script>
  export default {
    methods:{
      sendOrder(e){
        e.preventDefault();
      }
    },
    computed:{
      first_name:{
        get(){
          return this.$store.state.user.first_name
        },
        set(value){
          // + validation code here
          this.$store.commit('setUserFirstName', value)
        }
      },
      last_name:{
        get(){
          return this.$store.state.user.last_name
        },
        set(value){
          this.$store.commit('setUserLastName', value)
        }
      },
      phone:{
        get(){
          return this.$store.state.user.phone
        },
        set(value){
          this.$store.commit('setPhone', value)
        }
      },
      street:{
        get(){
          return this.$store.state.user.adress.street
        },
        set(value){
          let adress = this.$store.state.user.adress
          adress.street = value
          this.$store.commit('setUserAdress', adress)
        }
      },
      zip:{
        get(){
          return this.$store.state.user.adress.zip
        },
        set(value){
          let adress = this.$store.state.user.adress
          adress.zip = value
          this.$store.commit('setUserAdress', adress)
        }
      },
      city:{
        get(){
          return this.$store.state.user.adress.city
        },
        set(value){
          let adress = this.$store.state.user.adress
          adress.city = value
          this.$store.commit('setUserAdress', adress)
        }
      }
    }
  }
</script>
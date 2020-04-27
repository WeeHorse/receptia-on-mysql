<template>
  <div>
    <div class="cart" v-if="items.length>0">
      <ul>
        <li v-for="item in items" :key="item.title">
          <span v-if="item.amount<2">{{item.title}} {{item.cost}}kr</span>
          <span
            v-if="item.amount>1"
          >{{item.title}} {{item.amount}} x {{item.cost}}kr = {{itemTotal(item)}}kr</span>
        </li>
        <li>Total: {{total}}kr</li>
      </ul>
      <button class="button" @click="togglePlaceOrder">Place order</button>
    </div>
    <Order v-if="showPlaceOrder"></Order>
  </div>
</template>

<script>
  import Order from '@/components/Order'
  export default {
    components:{
      Order
    },
    data(){
      return{
        showPlaceOrder: false
      }
    },
    computed:{
      items(){
        return this.$store.state.cart.items
      },
      total(){
        let t = 0;
        for(let item of this.$store.state.cart.items){
          t += item.amount * item.cost
        }
        return t
      }
    },
    methods:{
      itemTotal(item){
        return item.amount * item.cost
      },
      togglePlaceOrder(){
        this.showPlaceOrder = !this.showPlaceOrder
      }
    }

  }
</script>
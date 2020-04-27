<template>
  <div>
    <section
      v-for="food in foods"
      v-bind:key="food.title"
      v-bind:style="{ backgroundImage: 'url(' + food.image + ')' }"
    >
      <div class="image"></div>
      <div class="text">
        <h2>{{food.title}}</h2>
        <p>{{food.cost}}kr</p>
        <div class="icons">
          <div>
            <i class="fas fa-apple-alt"></i>
            <i class="fas fa-utensils"></i>
          </div>
          <div>
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div>
            <i class="far fa-star"></i>
          </div>
          <i class="far fa-clock"></i>
        </div>
        <p>{{food.text}}</p>
        <button class="add-to-cart" @click="addToCart(food)">Add to cart</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed:{
    foods(){
      let f = []
      for(let food of this.$store.state.foods.data){
        if(food.category === this.$route.params.food){
          f.push(food)
        }
      }
      return f
    }
  },
  created(){
    this.$store.dispatch("loadFoodsData")
  },
  methods:{
    addToCart(item){
      this.$store.dispatch('addToCart', item)
    }
  }
}

</script>
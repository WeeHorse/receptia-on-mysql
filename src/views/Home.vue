<template>
  <div class="intro text">
    <h2>
      {{title}} -
      <em>{{one}} {{two}} {{three}}</em>
    </h2>
    <div class="icons">
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
    </div>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      one: 99,
      two: "1/2",
      three: "won't do!"
    }
  },
  computed:{
    title(){
      return this.$store.state.home.title
    },
    text(){
      return this.$store.state.home.text
    }
  }
}

</script>
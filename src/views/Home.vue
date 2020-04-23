<template>
  <div class="intro text">
    <h2>{{title}}</h2>
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
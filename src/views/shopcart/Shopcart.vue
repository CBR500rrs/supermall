<template>
  <div id="shopcart">
    <nav-bar class="shopcart-nav">
       <div slot="center-nav">购物车(0)</div>
    </nav-bar>
   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'Shopcart',
    components:{
      NavBar
  }
}
</script>

<style>
.shopcart-nav{
  background-color: var(--color-tint);
  font-size: 18px;
  color: white;
}
</style>
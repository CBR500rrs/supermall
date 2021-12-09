<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
     <cart-list-item v-for="(item,index) in cartList" 
     :key="index" :product='item'></cart-list-item>
    </scroll>
     
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartlistItem.vue'

import {mapGetters} from 'vuex'

export default {
    name:'CartList',
    components:{  
      CartListItem,
      Scroll,
      },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
}
</script>

<style scoped>
.cart-list{
  height: 83vh;
}
.content{
  height: 83vh;
  background-color: #fff;
  overflow: hidden;
}
</style>
<template>
  <div id="shopcart">
    <!-- 导航 -->
    <nav-bar class="shopcart-nav">
       <div slot="center-nav">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
 
   <cart-list ></cart-list>
     <!-- 底部汇总 -->
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottom from './childComps/CartBottom.vue'

import {mapGetters} from 'vuex'

export default {
    name:'ShopCart',
    components:{
      NavBar,
      CartList,
      CartBottom
  },
  
  computed:{
    // 数组形式 ...mapGetters(['cartLength','cartList'])
    ...mapGetters({//对象形式
      length:'cartLength',
      })
  }
}
</script>

<style scoped>
.shopcart-nav{
  background-color: var(--color-tint);
  font-size: 18px;
  color: white;
  
}

</style>
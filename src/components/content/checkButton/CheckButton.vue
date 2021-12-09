<template>
  <div class="check-button" :class="{checked:this.isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'CheckButton',
    props:{
    isChecked:{
        type:Boolean,
        default:true
        }
    }
}
</script>

<style scoped>
    .check-button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #aaa;
        
    }
    .checked{
        /* border-color: var(--color-high-text); */
        background-color: var(--color-high-text) ;
    }

</style>
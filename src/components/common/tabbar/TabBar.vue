<template>
   <div id="tab-bar">
       <slot></slot>
    </div>
</template>

<script>
export default {
    name:'TabBar'
}
</script>

<style>

  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* bottom: 38px; */

    box-shadow: 0 -3px 5px 2px #e6e6e6 ;
  }
 
</style>
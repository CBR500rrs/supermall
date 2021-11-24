<template>
    <div class="nav-bar">
        <div class="left"><slot name="left-nav"></slot></div>
        <div class="center"><slot name="center-nav"></slot></div>
        <div class="right"><slot name="right-nav"> </slot></div>

    </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style>
.nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
   
    box-shadow: 0 3px 5px 2px #e6e6e6 ;
}
.left,.right{
    width: 60px;
    /* background-color: red; */
}
.center{
    flex: 1;
    /* background-color: blue; */
}
</style>
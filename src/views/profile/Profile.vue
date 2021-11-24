<template>
   <div id="profile">
    <nav-bar class="profile-nav">
       <div slot="center-nav">个人信息</div>
    </nav-bar>
   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'Profile',
    components:{
      NavBar
  }
}
</script>

<style>
.profile-nav{
    background-color: var(--color-tint);
    font-size: 18px;
    color: white;
}
</style>
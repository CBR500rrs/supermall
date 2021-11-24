<template>
    <div id="category" >
        <nav-bar class="category-nav">
            <div slot="center-nav">商品分类</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'Category',
    components:{
        NavBar
    }
}
</script>

<style>
    .category-nav{
        background-color: var(--color-tint);
        font-size: 18px;
        color: white;
    }
</style>
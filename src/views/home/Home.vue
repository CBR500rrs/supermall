<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center-nav">购物街</div>
        </nav-bar>
       <home-swiper :banners='banners'></home-swiper>
       <home-recommend :recommends='recommends'></home-recommend>
       <popular ></popular>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import Popular from './childComps/Popular'

import {getHomeMultidata} from 'network/home.js'


export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommend,
        Popular
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created() {
        getHomeMultidata().then(res=>{
            // console.log(res);
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list

        })
    },
}
</script>

<style>
    #home{
        padding-top: 44px;
    }
    .home-nav{
        background-color: var(--color-tint);
        font-size: 18px;
        color:white;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

</style>
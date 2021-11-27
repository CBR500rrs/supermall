<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center-nav">购物街</div>
        </nav-bar>

       <scroll class="content" ref='scroll' :probe-type='3' 
        @scroll='contentScroll' 
        @pullingUp='loadMore'
        :pull-upload='true'>
            <home-swiper :banners='banners'></home-swiper>
            <home-recommend :recommends='recommends'></home-recommend>
            <popular ></popular>
            <tab-control class="tab-contorl" :titles="['流行', '新款', '精选']" @tabClick='tabClick'></tab-control>
            <goods-list :goods="showGoods"></goods-list>
       </scroll>
       <!-- 监听组件根元素的额原生事件 .native 
       需要监听组建的原生事件时，必须给对应的事件加上.native修饰符-->
        <back-top @click.native="backClick" v-show='isShowBackTop'></back-top>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import Popular from './childComps/Popular'


import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'



export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommend,
        Popular,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType:'pop',
            isShowBackTop:false
        }
    },
    created() {
        this.getHomeMultidata(),
        // 请求商品数据
        this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')

    },
    methods: {
        // 事件监听相关方法
        tabClick(index){
            // this.currentType = (index==0)?'pop':(index==1)?'new':'sell'
            //2. this.currentType = Object.keys(this.goods)[index]
            // 第三种
            switch(index){
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            // console.log(this.currentType);
        }, 
        backClick(){
            // console.log('返回顶部');
            // Scroll组件里有个scroll的属性
            this.$refs.scroll.scrollTo(0, 0)
         },
        contentScroll(position){
            // console.log(position);
            this.isShowBackTop = Math.abs(position.y)>=1000
        },
        loadMore(){
            console.log('上拉加载更多');
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.refresh()
        },

        //网络请求相关
        getHomeMultidata(){
             getHomeMultidata().then(res=>{
            // console.log(res);
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
            })
         },
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
                
                // console.log(res);
                // console.log(res.data.page);
            })
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    }
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
        /* 视口高度 */
        height: 100vh;
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
    /* .tab-control{
        background-color: white;
        position: sticky;
        top: 44px;
        z-index: 9;
    } */
    .content{
        /* height: calc(100% - 93px); */
        position: absolute;
        top: 44px;
        bottom: 49px;
        overflow: hidden;
        left: 0;
        right: 0;
    }
</style>
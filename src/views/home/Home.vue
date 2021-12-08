<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center-nav">购物街</div>
        </nav-bar>

        <tab-control  :titles="['流行', '新款', '精选']" @tabClick='tabClick' ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

       <scroll class="content" ref='scroll' :probe-type='3' 
        @scroll='contentScroll' :pull-upload='true'
       @pullingUp='loadMore'>
        <!--    -->
            <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
            <home-recommend :recommends='recommends'></home-recommend>
            <popular ></popular>
            <tab-control  :titles="['流行', '新款', '精选']" @tabClick='tabClick'
            ref="tabControl2" ></tab-control>
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

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin'



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
    },
    mixins:[itemListenerMixin, backTopMixin],
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            // isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY:0,
            itemImgListener:null
        }
    },
    //钩子函数
    activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        // console.log(this.saveY);
        // 取消全局事件的监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
        this.getHomeMultidata()

        // 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

     
    },
    mounted() {
    //     const refresh = debounce(this.$refs.scroll.refresh,50)
    //      // 监听item中图片是否加载完成 解决scroll加载滚动高度时 图片未加载完成导致的问题
        
    //     // 保存监听事件
    //     this.itemImgListener = ()=>{
    //         // console.log('bus----监听');
    //         // this.$refs.scroll.refresh()
    //      refresh()
    //     }
    //    this.$bus.$on('itemImageLoad',this.itemImgListener)  
 
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
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index

        }, 
        // backClick(){ 抽到了Mixin中},
        contentScroll(position){
            // 判断返回上面是否显示
            this.isShowBackTop = Math.abs(position.y) >= 1000
            // 判断tabcontrol是否吸顶
            this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
        },
        loadMore(){
            this.getHomeGoods(this.currentType)
            // this.$refs.scroll.refresh()
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
            })
        },
        swiperImageLoad(){
        // 在轮播图加载完成后监听，避免图像未完全加载出来导致offsettop数值错误
        // 获取tabcontrol组件内的模板元素的offsettop 
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        height: 100vh;
    }
    .home-nav{
        background-color: var(--color-tint);
        font-size: 18px;
        color:white;
    }
   
    .content{
        position: absolute;
        top: 44px;
        bottom: 49px;
        overflow: hidden;
        left: 0;
        right: 0;
    }
    .tab-control{
        position: relative;
        background-color: #fff;
        z-index: 9;
    }
</style>
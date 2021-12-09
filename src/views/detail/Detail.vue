<template>
    <div id="detail">
       <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
       <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll'>
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
            <detail-param-info :param-info='paramInfo' ref="params"></detail-param-info>
            <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
            <goods-list :goods='recommends' ref="recommend"></goods-list>
       </scroll>
       <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
        <back-top @click.native="backClick" v-show='isShowBackTop'></back-top>
     
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils' 
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,

    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
        return {
            iid:'',
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            itemImgListener:null,
            topYs:[],
            getTopY:null,
            currentIndex:0,
            
        }
    },
    created() {
        // 保存传入的商品id
        this.iid = this.$route.params.iid
        //根据id请求详情数据
        getDetail(this.iid).then(res =>{
            // 获取顶部轮播图
            const data = res.result

            this.topImages = data.itemInfo.topImages
            // 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 创建店铺信息对象
            this.shop = new Shop(data.shopInfo)

            //保存商品详情数据
            this.detailInfo = data.detailInfo
           
           // 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)

            // 获取评论信息
            this.commentInfo =   data.rate.list ? data.rate.list[0] : {}
            
            // this.$nextTick(()=>{
            //     //DOM加载完成后执行回调函数
            //     //会出现DOM加载完成 但图片未加载完成 高度获取错误
            //     this.topYs.push(0)
            //     this.topYs.push(this.$refs.params.$el.offsetTop + (-45))
            //     this.topYs.push(this.$refs.comment.$el.offsetTop + (-45))
            //     this.topYs.push(this.$refs.recommend.$el.offsetTop + (-45))
            // })

            // 进行一次防抖操作
            this.getTopY = debounce(()=>{
                this.topYs = []
                this.topYs.push(0)
                this.topYs.push(this.$refs.params.$el.offsetTop + (-45))
                this.topYs.push(this.$refs.comment.$el.offsetTop + (-45))
                this.topYs.push(this.$refs.recommend.$el.offsetTop + (-45))
                this.topYs.push(Number.MAX_VALUE)
            })
        })
        //请求推荐数据
        getRecommend().then(res=>{
            this.recommends = res.data.list
        })
   },
    mounted() {
    //使用了mixins混入 itemListenerMixin 在common/utils.js中
   },
    updated() {
        // this.topYs = []
    },
   destroyed() {
    //    console.log('destoryed');
     this.$bus.$off('itemImageLoad', this.itemImgListener)
   },
    methods: {
        imageLoad(){
            // this.$refs.scroll.refresh()//会频繁调用 使用防抖
           this.refresh()
            this.getTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.topYs[index], 300)
        },
        contentScroll(position){
            // 获取y值
            const positionY = Math.abs(position.y)
            // 与详情页中的主题高度值进行对比
            let length = this.topYs.length
            // for(let i = 0;i<length; i++){
            //     // console.log(i); es6遍历i是字符串 i+1 可能出现 01
            //     if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.topYs[i] && positionY < this.topYs[i+1]) || (i === length - 1 && positionY >= this.topYs[i]))){
            //         this.currentIndex = i //避免重复 
            //         // console.log(this.currentIndex);
                    
            //         this.$refs.nav.currentIndex = this.currentIndex
            //     }   
            // }

            // 有一个最大值MAX_VALUE之后判断条件会简单
            for (let i = 0; i < length - 1; i++){ //最后一个值MAX_VALUE不用遍历
                if(this.currentIndex !== i && (positionY > this.topYs[i]) && positionY < this.topYs[i+1]){
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            
            // 3.是否显示回到顶部
            this.isShowBackTop = Math.abs(position.y) >= 1000 
        },
        addToCart(){
            // console.log('加入购物车');
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // console.log(product);
            // 使用vueX管理传入购物车的信息

            // 将商品添加到购物车
            this.$store.dispatch('addCart', product)
             
        }
    },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 1;
    background-color: #fff;
}
.content{
    overflow: hidden;
    height: 95vh;
    background-color: #fff;
}

</style>
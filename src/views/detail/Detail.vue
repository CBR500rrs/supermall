<template>
    <div id="detail">
       <detail-nav-bar class="detail-nav"></detail-nav-bar>
       <scroll class="content" ref="scroll">
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo'></detail-goods-info>
            <detail-param-info :param-info='paramInfo'></detail-param-info>
            <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
       </scroll>
 
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

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

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
        Scroll

    },
    data() {
        return {
            iid:'',
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
        }
    },
    created() {
        // 保存传入的商品id
        this.iid = this.$route.params.iid
        //根据id请求详情数据
        getDetail(this.iid).then(res =>{
            // console.log(res);
            // 获取顶部轮播图
            const data = res.result

            this.topImages = data.itemInfo.topImages
            // 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // console.log(this.goods);

            // 创建店铺信息对象
            this.shop = new Shop(data.shopInfo)
            // console.log(this.shop.score);

            //保存商品详情数据
            this.detailInfo = data.detailInfo
            // console.log(this.detailInfo);
           
           // 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)

            // 获取评论信息
            console.log(data);
            this.commentInfo = data.rate.list[0]
        })
    },
    methods: {
        
        imageLoad(){
            this.$refs.scroll.refresh()
        }
    },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    
}
.content{
    /* height: calc(100% - 44px); */
    height: 100vh;
}

</style>
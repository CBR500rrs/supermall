<template>
    <div class="goodslistitem" @click="itemClick">
        <img :src="showImage" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">￥ {{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>

        </div>
    </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imageLoad(){
            // console.log('imageLoad');

            this.$bus.$emit('itemImageLoad')
        },
        itemClick(){
        // console.log('跳转到详情页');
            this.$router.push('/detail/' + this.goodsItem.iid)

        }
    },
}
</script>

<style scoped>
.goodslistitem {
    /* width: 170px; */
    padding-bottom: 40px;
    position: relative;
    /* margin-bottom:20px ; */
}
.goodslistitem img{
    border-radius: 5px;
    width: 100%;
}
.goods-info{
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
}
.goods-info p{
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     margin-bottom: 3px;
}
.goods-info .price{
    color: rgb(246, 52, 45);
    margin-right: 30px;
    /* font-size: 14px; */
}
.goods-info .collect{
    position: relative;
    color: rgb(255, 123, 0);
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px ;
}


</style>
<template>
    <div class="goodslistitem">
        <img :src="goodsItem.show.img" alt="">
        <div>
            <p>{{goodsItem.title}}</p>
            <span class="price">￥ {{goodsItem.price}}</span>
            <span class="collect">★ {{goodsItem.cfav}}</span>

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
    }
}
</script>

<style>
.goodslistitem {
    margin-top: 10px;
    width: 160px;
    text-align: center;
    /* border: 1px solid rgb(216, 212, 212); */
   
}
.goodslistitem p{
    font-size: 12px;
    /* margin-bottom: 5px; */
}
.goodslistitem .price{
    color: rgb(246, 52, 45);
    margin-right: 10px;
    font-size: 14px;
}
.goodslistitem .collect{
    color: rgb(255, 123, 0);
}
</style>
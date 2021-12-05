<template>
    <div class="shop-info">
        <div class="shop-logo">
            <img :src="shop.logo" alt="">
            <span>{{shop.name}}</span>
        </div>
        <div class="shop-msg">
            <div class="shop-left">
                <div class="shop-sells">
                    <div class="sell-count"> {{shop.sells | sellCountFilter}}</div>
                    <div class="sell-text">总销量</div>
                </div>
                <div class="shop-goods">
                    <div class="goods-count">{{shop.goodsCount}}件</div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="shop-evaluate">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                        <td class="better">
                            <span class="better"
                            :class="{'evl-better':item.isBetter}">{{item.isBetter?'高':'低'}}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-more">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailShopInfo',
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        sellCountFilter:function(value){
            if(value<10000)return value
            return (value/10000).toFixed(1)+'万'
        }
    }

}
</script>

<style scoped>
.shop-logo{
    /* height: 80px; */
    padding: 20px 10px 8px 8px;
}

.shop-logo img{
    width: 60px;
    border: 1px solid rgb(206, 205, 205);
    border-radius: 50%;
    margin-right:10px ;
}
.shop-logo span{
    font-size: 20px;
    font-weight: 600;
}
.shop-msg{
    padding: 0 8px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
}
.shop-left{
    width: 50%;
    border-right: 1px solid rgb(206, 205, 205);
    display: flex;
    justify-content: space-around;
    margin: 10px 0;

}
.shop-sells, .shop-goods{
    text-align: center;
    margin-top: 10px;
    /* line-height: 75px; */
}
 .sell-count,.goods-count{
    font-size: 20px;
    color: black;
    padding: 5px 0;
}
.sell-text,.goods-text{
    color: black;
}
.shop-evaluate{
    color: black;
}
.shop-evaluate table{
    width: 140px;
    margin-right: 10px;
    /* border: 1px solid red; */
}
.shop-evaluate table td{
    padding: 5px 2px;
}
.score{
    color: rgb(57, 200, 57);
}
.better span{
    background-color: rgb(57, 200, 57);
    color: #fff;
}
.score-better{
    color: rgb(240, 56, 56) !important 
}
.evl-better{
    color: #fff;
    background-color: rgb(240, 56, 56)   !important 
}
.shop-more {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
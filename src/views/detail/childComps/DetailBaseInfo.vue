<template>
    <div v-if="Object.keys(goods).length !== 0 " class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount" :style="{backgroundColor:goods.discountBgColor}">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" 
            v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon">
            <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
 .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
.info-title{
    font-size: 18px;
    color: black;
}
.info-price{
    margin-top: 10px;
    /* height: 30px; */
    /* position: relative; */

}
.o-price{
    text-decoration:line-through;
    margin-left: 10px;
}
.n-price{
    color: var(--color-high-text);
    font-size: 25px;
    /* margin:0 10px ; */
}
.discount{
    font-size: 13px;
    display: inline-block;
    padding: 1px 4px;
    /* background-color: var(--color-high-text); */
    color: #fff;
    border-radius: 10px;
    position: relative;
    top: -8px;
    left: 5px;
}
.info-other{
    margin-top: 15px ;
    line-height: 30px;
    /* padding-bottom:5px; */
    border-bottom: 1px solid rgb(206, 205, 205);
    display: flex;
    justify-content:space-between;
}
.info-service{
    color: black;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    vertical-align: middle;
}

.info-service-item img{
    width: 14px;
    /* position: relative; */
    /* top: 2px; */
}

</style>
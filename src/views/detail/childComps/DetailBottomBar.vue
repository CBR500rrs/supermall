<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
                <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
                <div>
                <i class="icon collect"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
        <!-- <sport-ball class="sport-ball"></sport-ball> -->
    </div>
</template>

<script>
export default {
    name:'DetailBottomBar',
    methods: {
        addToCart(){
            // console.log('buyClick');
            this.$emit('addCart')

        }
    },
}
</script>

<style scoped>
    .bottom-bar{
        height: 50px;
        width: 100%;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        text-align: center;
    }
    .bar-item{
        flex: 1;
        display: flex;
    }
    .bar-item>div{
        flex: 1;
    }
    .bar-left .text{
        font-size: 13px;
    }
    .bar-left .icon{
        display: block;
        width: 23px;
        height: 23px;
        margin: 6px auto 3px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }
    .bar-left .service{
        background-position: 0 -54px;
    }
    .bar-left .shop{
        background-position: 0 -102px;
    }
    .bar-right{
        font-size: 15px;
        color: #fff;
        line-height: 52px;
    }
    .bar-right .cart{
        background-color: #ffe817;
        font-weight:600;
        color: #333;
    }
    .bar-right .buy{
        font-size: 17px;
        background-color: #f69;
        font-weight:600;
    }
    .sport-ball{
        position: absolute;
        left: 225px;
        bottom: 20px;
    }
</style>
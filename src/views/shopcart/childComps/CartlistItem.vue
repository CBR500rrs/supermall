<template>
    <div id="shop-item">
        <div class="item-selector">
            <!-- <CheckButton></CheckButton> -->
            <check-button :is-checked = "product.checked" @click.native=" checkedClick"></check-button>
            <!-- <input type="checkbox"> -->
        <!-- 复选框 -->
        </div>

        <div class="item-img">
            <img :src="product.image" alt="商品图片">
        </div>

        <div class="item-info">
            <div class="item-title">{{product.title}}</div>
            <div class="item-desc">{{product.desc}}</div>
            <div class="info-bottom">
                <div class="item-price left">￥{{product.price}}</div>
                <div class="right">
                    <span class="item-count">x{{product.count}}</span>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name:'CartListItem',
    components:{
        CheckButton
    },
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        },
        checked:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods: {
        checkedClick(){
            this.product.checked = !this.product.checked
        },
       
    }
}
</script>

<style scoped>
    #shop-item{
        width: 100%;
        display: flex;
        font-size: 0;
        padding: 5px;
        border-bottom: 1px solid #ccc;
        /* justify-content:space-around; */
    }
    .item-selector{
        width: 20px;
        /* height: 20px; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-title, .item-desc{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-img{
        /* width: 100px;
        height: 100px; */
        padding: 5px;
        /* overflow: hidden; */
        
    }
    .item-img img{
        width: 70px;
        height: 100px;
        display: block;
        border-radius: 10px;
    }
    .item-info{
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
    }
    .item-info .item-desc{
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }
    .info-bottom{
        margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    .info-bottom .item-price{
        color: orangered;
    }
    .item-count{
        display: inline-block;
        text-align: center;
        /* border: 1px solid black; */
        border-radius: 5px;
        width: 25px;
        background-color: rgb(231, 231, 231);
    }

</style>
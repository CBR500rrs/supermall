<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked=' isSelectAll' @click.native='checkClick'></check-button>
            <span>全选</span>
        </div>
        <div class="tol-price">
            合计:<span class="price">{{totalPrice}}</span>
        </div>
        <div class="to-pay">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

// import {mapGetters} from 'vuex'

export default {
    name:'CartBottom',
    //  ...mapGetters( {length:'cartLength'}),
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            // let price = 0
            return '￥'+this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength(){
            // let res = 0
            // let len = this.$store.state.cartList.length
            // for(let i=0;i<len;i++){
            //     if(this.$store.state.cartList[i].checked){
            //         res+=this.$store.state.cartList[i].count
            //     }
            // }
            // return res
             return this.$store.state.cartList.filter(item=>{return item.checked}).reduce((preValue,item)=>{return preValue + item.count},0) //reduce接受一个函数作为累加器 此处0为初始值
        },
        isSelectAll(){
            // return !this.$store.state.cartList.filter(item => !item.checked).length 会遍历完cartList 
            // 优化性能 找到一个未checked即可
            if(this.$store.state.cartList.length === 0) return false
            return !this.$store.state.cartList.find(item=>!item.checked)
        }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => {
                    item.checked = false
                });
            }else{
                this.$store.state.cartList.forEach(item=>{
                item.checked = true
                })
            }
        }
    },
}
</script>

<style scoped>
    .bottom-bar {
        position: fixed;
        left: 0;
        bottom: 49px;
        width: 100%;
        /* display: flex; */
        /* text-align: center; */

        display: flex;
        justify-content:space-between;
        height: 46px;
        background-color: rgb(252, 223, 228);
        line-height: 46px;
    }
    .check-content{
        margin: 0 -15px 0 15px ;
        display: flex;
        /* display: inline-block; */
        line-height: 40px;
        /* justify-content: ; */
        align-items: center;
    }
    .check-button{
        width: 22px;
        height: 22px;
        line-height: 20px;
        border: 1px solid rgb(126, 124, 124);
        margin-right: 5px;
    }
    .tol-price .price{
        color: #ff4500;
        font-weight: 600;
    }
    .to-pay{
        text-align: center;
        width: 90px;
        background-color: #ff4500;
        color: white;
    }
</style>
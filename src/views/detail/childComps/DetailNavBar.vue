<template>
    <div id="detail">
        <nav-bar>
            <div slot="left-nav" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center-nav" class="title">
               <div v-for="(item,index) in titles" :key="index" class="title-item" :class="{active:index===currentIndex}"
               @click="titleClick(index)">
                   {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data() {
        return {
            titles:['商品', '参数', '评论', '推荐'],
            currentIndex:0
        }
    },
    methods: {
        titleClick(index){
            this.currentIndex = index
            this.$emit('titleClick', index)
        },
        backClick(){
            this.$router.back()
        }
    },
}
</script>

<style scoped>
/* #detail{
    position: relative;
    z-index: 9;
} */
.title{
    display: flex;
    justify-content: space-around;
    
}
.back img{
    width: 20px;
}
.active{
    color: var(--color-high-text);
}

</style>
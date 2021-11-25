<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click ='itemClick(index)'>
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods: {
        itemClick(index){
            this.currentIndex = index
        },
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    /* color: #ff8198; */
    
}
.tab-control-item{
    /* justify-content: space-around; */
    flex: 1;
    line-height: 40px;
   
}
.active{
    color:var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
}
</style>
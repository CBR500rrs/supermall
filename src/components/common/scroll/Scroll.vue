<template>
    <!-- ref一般绑定给子组件 -->
  <div class='wrapper' ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import ObserveDOM from '@better-scroll/observe-dom'
// import PullUp from '@better-scroll/pull-up'


// BScroll.use(ObserveDOM)
// BScroll.use(PullUp)

export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:true
        }

    },
    data(){
        return {
            scroll:null
        }
    },
    mounted() {
        // BetterScroll.createBScroll(document.querySelector('.content')
        // console.log(this.$refs.wrapper);
        this.scroll = new BScroll(this.$refs.wrapper, {
            observeDOM:true,
            click:'true',
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            observeImage: true
        })
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            //发出事件scroll 接受到的事件获得position参数
            this.$emit('scroll',position)

        })
        this.scroll.on('pullingUp', ()=>{
            // console.log('上拉加载更多')
            this.$emit('pullingUp')
            })
       
    },methods: {
        scrollTo(x,y,time=500){ //time 为不给参数时的默认值 es6的语法
            this.scroll.scrollTo(x, y, time)
        },
        
        finishPullUp(){
            this.scroll.finishPullUp()   
        },
        //上拉加载图片
        //避免图片没加载完就计算高度出错
        refresh(){
            this.scroll.refresh()
        }
    },
}
</script>

<style scoped>

</style>
<template>
  <div id="home-swiper">
      <div class="swiper" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
          <!-- 放图片的插条 -->
          <slot></slot> 
      </div>
      <!-- 为indicator占位 调用时使用slot=‘indicator’ -->
      <slot name="indicator"></slot> 
      <div class="indicator">
          <slot name="indicator" v-if="showIndicator && slideCount > 1" >
              <!-- 占位 未调用时默认使用该div -->
              <div class="indicator-item" v-for="(item,index) in slideCount" :key="index" :class="{active:index === currentIndex - 1}"></div>
          </slot>
      </div>
  </div>
</template>

<script>
export default {
    name:'Swiper',
    props:{
        interval:{
            type: Number,
            default:3000
        },
        animDuration:{
            type: Number,
            default:300
        },
        showIndicator:{
            type: Boolean,
            default:true
        },
         moveRatio: {
        type: Number,
        default: 0.25
      },
    },
    data(){
        return {
            slideCount: 0, // 元素个数
            totalWidth: 0, // swiper的宽度
            swiperStyle: {}, // swiper样式
            currentIndex: 1, // 当前的index
            scrolling: false, // 是否正在滚动
        }
    },
    //初始化页面(页面加载)完成后，对dom节点进行相关操作
    mounted() {
        // 在指定事件后执行函数
        setTimeout(()=>{
            // 1.操作DOM，在前后添加Slide
            this.handleDom()

            // 2开启定时器
            this.startTimer()
        },100)
    },
    methods: {
        // 定时操作
        startTimer(){
            this.playTimer = window.setInterval(()=>{
                this.currentIndex++
                this.scrollContent(-this.currentIndex * this.totalWidth)
            },this.interval)
        },
        // 停止计时器
        stopTimer(){
            window.clearInterval(this.playTimer)
        },
         // 滚动到正确位置
        scrollContent(currentPosition){
            //设置正在滚动
            this.scrolling = true
            //开始滚动动画
            this.swiperStyle.transform = 'transform' + this.animDuration + 'ms';
            this.setTransform(currentPosition)
            // 判断滚动位置
            this.checkPosition()
            //完成滚动
            this.scrolling = false
        },
        // 检查位置是否正确
        checkPosition(){
            window.setTimeout(() => {
                this.swiperStyle.transition = '0ms'
                if(this.currentIndex >= this.slideCount + 1){//索引超出请求数据列表长度时
                    this.currentIndex = 1 //跳回第一张
                    this.setTransform(-this.currentIndex * this.totalWidth)
                }else if(this.currentIndex <= 0){
                    this.currentIndex = this.slideCount
                    this.setTransform(-this.currentIndex * this.totalWidth)
                }
                // 回调 currentIndex数减一
                this.$emit('transitionEnd', this.currentIndex - 1)
                // console.log(this.currentIndex);
            },this.animDuration)
        },
          // 设置滚动位置
        setTransform(position){
            this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
            // 针对safari浏览器
            // this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
        },
        // 操作DOM添加所有的slide
        handleDom(){
            let swiperEl = document.querySelector('.swiper') //获取swiper类
            let slidesEls = swiperEl.getElementsByClassName('slide') //获取swiper类里所有的slide类 4个slide
            // console.log('swiperEl',swiperEl);
            // console.log(slidesEls);
            this.slideCount = slidesEls.length // this.slideCount = 4
           
           if(this.slideCount > 1){ //大于1时在前后分别新增一个slide
            //    将一个列表项从一个复制到另一个
               let cloneFirst = slidesEls[0].cloneNode(true)
               let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
            // 向cloneLast列表中插入一个项目
                swiperEl.insertBefore(cloneLast, slidesEls[0])
                swiperEl.appendChild(cloneFirst)
                // console.log(swiperEl);
                this.totalWidth = swiperEl.offsetWidth //单张图片的宽度
                this.swiperStyle = swiperEl.style 
            }
            // 重新让swiper显示回第一个图片
            // 由于之前insertBefore 当前显示的是插入的最后一个元素
            this.setTransform(-this.totalWidth) //平移操作向右走375像素刚好一张图片
        },
        // 拖动事件
         touchStart(e){
            //  正在滚动时不能拖动
             if(this.scrolling) return

            //  停止计时器
            this.stopTimer()

            // 保存开始滚动的位置
            this.startX = e.touches[0].pageX //拖动横坐标
         },
        touchMove(e){
            // 计算用户拖动的距离
            this.currentX = e.touches[0].pageX
            this.distance = this.currentX - this.startX
            let currentPosition = -this.currentIndex * this.totalWidth
            let moveDistance = this.distance + currentPosition

            // 设置当前位置
            this.setTransform(moveDistance)
        },
        touchEnd(e){
            // 获取移动距离
            let currentMove = Math.abs(this.distance);
            // 判断最终距离
            if(this.distance === 0){ //未移动
                return 
            }else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){ //当手向右移动距离大于图片宽度的0.25 
                this.currentIndex--
            }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){//当手向左移动距离大于图片宽度的0.25 
                this.currentIndex++
            }
            // 移动到正确的位置
            this.scrollContent(-this.currentIndex * this.totalWidth)

            // 移动完成后重新开始定时器
            this.startTimer()
        },
        /**
         * 控制上一个, 下一个
         */
        previous() {
            this.changeItem(-1);
        },

        next() {
            this.changeItem(1);
        },

        changeItem (num) {
        // 1.移除定时器
            this.stopTimer();

            // 2.修改index和位置
            this.currentIndex += num;
            this.scrollContent(-this.currentIndex * this.totalWidth);

            // 3.添加定时器
            this.startTimer();
      }
     
    },
}
</script>

<style scoped>
    #home-swiper{
        overflow: hidden;
        position: relative;
        z-index: 9
    }
    .swiper {
        display: flex;
    }
    .indicator{
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        bottom: 8px;
    }
   .indicator-item{
       box-sizing: border-box;
       width: 8px;
       height: 8px;
       border-radius: 4px;
       background-color: #fff;
       line-height: 8px;
       text-align: center;
       font-size: 12px;
       margin: 0 5px;
   }
    .indicator-item.active{
        background-color:  rgba(212,62,46,1.0);
    }
</style>
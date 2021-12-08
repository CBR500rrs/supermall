import {debounce} from 'common/utils' 
import BackTop from 'components/content/backTop/BackTop'

// 抽取到的图片加载完成以及防抖
export const itemListenerMixin = {
   data() {
      return {
         refresh:null
      }
   },
    mounted() {
      this.refresh = debounce(this.$refs.scroll.refresh,50)
      this.itemImgListener = ()=>{
         this.refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
      //   console.log('我是混入中的');
   }
  
}
// 抽取到的返回顶部
export const backTopMixin = {
   data(){
      return {
         isShowBackTop:false
      }
   },
   components:{
      BackTop
   },
   methods: {
      backClick(){
         // console.log('返回顶部');
         // Scroll组件里有个scroll的属性
         this.$refs.scroll.scrollTo(0, 0)
      },
   },
}
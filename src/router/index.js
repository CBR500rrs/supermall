import Vue from 'vue'
import VueRouter from 'vue-router'

// 避免重复点击报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const Home = ()=>import('../views/home/Home')
const Category = ()=>import('../views/category/Category')
const Shopcart = ()=>import('../views/shopcart/Shopcart')
const Profile = ()=>import('../views/profile/Profile')


Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
    path:'/home',
    component:Home
    },
    {
    path:'/category',
    component:Category
    },{
    path:'/shopcart',
    component:Shopcart
    },
    {
    path:'/profile',
    component:Profile
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router
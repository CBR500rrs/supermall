// 把所有首页相关的网络请求都封装再一个js文件中 
//便于管理首页内容的请求管理
import { request } from "./request"; //未使用default导出的一律使用{}导入

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
export function getHomeGoods(type, page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}
export default {
    addCart(context, payload){
        // payload 为新添加的商品
        // 查找之前数组中是否有该商品
        let oldproduct = context.state.cartList.find((item) => item.iid === payload.iid)
        if(oldproduct){
            // oldproduct.count += 1
            context.commit('addCounter',oldproduct)
        }else{
            payload.count =1
            context.commit('addToCart', payload)
        }   
    }
}
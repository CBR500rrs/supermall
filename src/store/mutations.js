export default { 
    addCounter(state,pyload){
        pyload.count++
    },
    addToCart(state, pyload){
        pyload.checked = true
        state.cartList.push(pyload)
        
    }
}
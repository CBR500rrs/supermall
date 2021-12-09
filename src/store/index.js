import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from'./getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    //用来修改state中的内容
    //每个mutation中的方法尽可能完成的事件比较单一
    mutations,
    actions,
    getters
})
export default store
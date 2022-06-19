import Vue from 'vue'
import VUex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //全局对象 用来保存所有组件的公共数据
    state:{
        routes:[]
    },
    //可以改变state中值的一个方法 同步执行
    mutations:{
        initRoutes(state,data){
            state.routes = data;
        }
    },
    //异步执行
    actions:{}
})
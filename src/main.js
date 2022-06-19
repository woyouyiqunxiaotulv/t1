import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//可以全局使用
import {postRequest} from "./utils/api.js";
import {putRequest} from "./utils/api.js";
import {getRequest} from "./utils/api.js";
import {deleteRequest} from "./utils/api.js";

Vue.use(ElementUI);
Vue.config.productionTip = false

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

//aaaa
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

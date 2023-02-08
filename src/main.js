import Vue from 'vue'
import App from './App.vue'
import './js/ele'
import ElementUI from 'element-ui'
import './theme/index.css'
import router from './router'
import common from './js/common.js'
import store from './store'
import 'animate.css'
import Waterfall from 'vue-waterfall/lib/waterfall'
// 引入截图插件
import html2canvas from 'html2canvas'
// 水印
// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
/*引入axios qs库*/
import axios from 'axios';
import Qs from 'qs'
/*ie兼容问题*/
// require("babel-polyfill");
Vue.prototype.axios = axios
Vue.prototype.qs = Qs

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$common = common

new Vue({
  router,
  store,
  Waterfall,
  html2canvas,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './js/ele'
import ElementUI from 'element-ui'
import './theme/index.css'
import router from './router'
import common from './js/common.js'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$common = common

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'
import vueMoment from 'vue-moment'
Vue.config.productionTip = false

Vue.use(VueRx, Rx)
Vue.use(vueMoment)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

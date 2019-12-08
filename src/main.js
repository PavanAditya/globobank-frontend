// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
export default new Vuetify({ })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})

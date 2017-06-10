
'use strict'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// import axios from 'axios'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

// axios
// axios.defaults.baseURL = 'http://localhost:3000/api/djp'
// Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

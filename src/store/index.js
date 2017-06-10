
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import plugins from './plugins.js'

Vue.use(Vuex)

export const LOCAL_KEY = 'user' // Local Storage Key

export const DEFAULT_USER = {
  dbName: '',
  name: '',
  auth: ''
}

const store = new Vuex.Store({
  state: {
    // err: {},
    citydb: {}, // { '深圳': 'sz', '广州': 'gz', '杭州': 'hz' },
    user: JSON.parse(window.localStorage.getItem(LOCAL_KEY)) || DEFAULT_USER,
    list: [],
    changedIndex: -1
  },
  mutations,
  actions,
  plugins
})

export default store

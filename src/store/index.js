
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins.js'

Vue.use(Vuex)

export const LOCAL_KEY = 'user'

export const DEFAULT_USER = {
  dbName: '',
  name: '',
  auth: ''
}

const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem(LOCAL_KEY)) || DEFAULT_USER,
    list: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_ITEM: (state, { index, item }) => {
      Vue.set(state.list, index, item)
    }
  },
  plugins
})

export default store

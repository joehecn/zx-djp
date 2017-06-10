
'use strict'

import Vue from 'vue'
import { SET_CITYDB, SET_USER,
  SET_LIST, SET_ITEM, SET_CHANGED_INDEX } from './mutation-types.js'

export default {
  // [SET_ERR] (state, err) {
  //   state.err = err
  // },

  [SET_CITYDB] (state, citydb) {
    state.citydb = citydb
  },
  [SET_USER] (state, user) {
    state.user = user
  },
  [SET_LIST] (state, list) {
    state.list = list
  },
  [SET_ITEM] (state, { index, item }) {
    Vue.set(state.list, index, item)
  },
  [SET_CHANGED_INDEX] (state, changedIndex) {
    state.changedIndex = changedIndex
  }
}

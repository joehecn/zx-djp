
'use strict'

import * as api from '@/api'
import { SET_CITYDB, SET_USER,
  SET_LIST, SET_ITEM, SET_CHANGED_INDEX } from './mutation-types.js'

export default {
  // setErr ({ commit }) {
  //   return api.setErr().then(response => {
  //     commit(SET_ERR, response.data)
  //   })
  // },

  citydb ({ commit }) {
    return api.citydb().then(response => {
      commit(SET_CITYDB, response.data)
    })
  },

  login ({ commit }, userObj) {
    const userStr = JSON.stringify(userObj)
    const user = Buffer.from(userStr).toString('base64')

    return api.login(user).then(response => {
      commit(SET_USER, {
        dbName: userObj.dbName,
        name: userObj.name,
        auth: response.data
      })
    })
  },

  setUser ({ commit }, user) {
    commit(SET_USER, user)
  },

  getList ({ commit }, { auth, searchDate }) {
    return api.list(auth, searchDate).then(response => {
      commit(SET_LIST, response.data)
    })
  },

  setList ({ commit }, list) {
    commit(SET_LIST, list)
  },

  setItem ({ commit }, obj) {
    commit(SET_ITEM, obj)
  },

  isPrint ({ commit }, obj) {
    return api.isPrint(
      obj.item._id, obj.auth, obj.value
    ).then(() => {
      commit(SET_ITEM, obj)
    })
  },

  setChangedIndex ({ commit }, changedIndex) {
    commit(SET_CHANGED_INDEX, changedIndex)
  },

  djpNote ({ commit }, obj) {
    return api.djpNote(
      obj.item._id, obj.auth, obj.value
    ).then(() => {
      commit(SET_ITEM, obj)
    })
  }
}

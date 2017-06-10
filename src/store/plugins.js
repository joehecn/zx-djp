
'use strict'

import { LOCAL_KEY } from './index'
import { SET_USER } from './mutation-types.js'

const localStoragePlugin = store => {
  store.subscribe((mutation, { user }) => {
    if (mutation.type === SET_USER) {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(user))
    }
  })
}

export default [localStoragePlugin]

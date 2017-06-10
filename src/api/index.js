
'use strict'

import axios from 'axios'
import moment from 'moment'

axios.defaults.baseURL = 'http://localhost:3000/api/djp'

export const setErr = () => {
  return axios({
    url: '/err'
  })
}

export const citydb = () => {
  return axios({
    url: '/citydb'
  })
}

export const login = user => {
  return axios({
    method: 'post',
    url: '/users/login',
    data: { user }
  })
}

export const list = (auth, searchDate) => {
  return axios({
    url: '/djps',
    headers: {'Authorization': `Bearer ${auth}`},
    params: {
      smDate: moment(searchDate).format('YYYY-MM-DD')
    }
  })
}

export const isDownload = (_id, auth, val) => {
  return axios({
    method: 'put',
    url: `/djps/isdownload/${_id}`,
    headers: {'Authorization': `Bearer ${auth}`},
    data: { value: val }
  })
}

export const isPrint = (_id, auth, val) => {
  return axios({
    method: 'put',
    url: `/djps/isprint/${_id}`,
    headers: {'Authorization': `Bearer ${auth}`},
    data: { value: val }
  })
}

export const djpNote = (_id, auth, val) => {
  return axios({
    method: 'put',
    url: `/djps/djpnote/${_id}`,
    headers: {'Authorization': `Bearer ${auth}`},
    data: { value: val }
  })
}

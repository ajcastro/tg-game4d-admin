/* eslint-disable no-param-reassign */
import Vue from 'vue'
import env from '@env'
import Qs from 'qs'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: env.baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  headers: { Accept: 'application/json' },
})

// https://stackoverflow.com/a/54978717
axiosIns.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.paramsSerializer = params => Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    })
  }

  return config
})

Vue.prototype.$http = axiosIns

export default axiosIns

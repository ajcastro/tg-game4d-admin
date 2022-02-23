import Vue from 'vue'
import env from '@env'

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

Vue.prototype.$http = axiosIns

export default axiosIns

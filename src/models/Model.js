/* eslint-disable class-methods-use-this */
import { Model as BaseModel } from 'vue-api-query'
import env from '@env'

export default class Model extends BaseModel {
  // Define a base url for a REST API
  baseURL() {
    return `${env.baseURL}/api/admin`
  }

  // Implement a default request method
  request(config) {
    return this.$http.request(config)
  }
}

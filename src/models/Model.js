/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
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
    const isFormData = config.data instanceof FormData

    if (isFormData && config.method === 'PUT') {
      config.method = 'POST'
      config.data.append('_method', 'PUT')
    }

    return this.$http.request(config)
  }
}

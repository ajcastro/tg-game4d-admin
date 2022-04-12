/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Bank extends Model {
  resource() {
    return 'banks'
  }
}

/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class User extends Model {
  resource() {
    return 'users'
  }
}

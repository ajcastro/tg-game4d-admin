/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Role extends Model {
  resource() {
    return 'users'
  }
}

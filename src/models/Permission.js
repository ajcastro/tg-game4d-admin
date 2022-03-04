/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Permission extends Model {
  resource() {
    return 'permissions'
  }
}

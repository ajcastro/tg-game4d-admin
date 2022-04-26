/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class UserLog extends Model {
  resource() {
    return 'user_logs'
  }
}

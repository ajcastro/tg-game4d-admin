/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Member extends Model {
  resource() {
    return 'members'
  }
}

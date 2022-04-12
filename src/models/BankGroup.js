/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class BankGroup extends Model {
  resource() {
    return 'bank_groups'
  }
}

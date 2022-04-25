/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class TransferLog extends Model {
  resource() {
    return 'transfer_logs'
  }
}

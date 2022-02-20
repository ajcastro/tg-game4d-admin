/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Client extends Model {
  resource() {
    return 'clients'
  }
}

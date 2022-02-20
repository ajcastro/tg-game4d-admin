/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Website extends Model {
  resource() {
    return 'websites'
  }
}

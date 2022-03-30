/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class Promotion extends Model {
  resource() {
    return 'promotions'
  }
}

/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class GameTransaction extends Model {
  resource() {
    return 'game_transactions'
  }
}

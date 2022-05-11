/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class MarketSchedule extends Model {
  resource() {
    return 'market_schedules'
  }
}

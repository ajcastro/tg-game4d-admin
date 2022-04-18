/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class ReferralLog extends Model {
  resource() {
    return 'referral_logs'
  }
}

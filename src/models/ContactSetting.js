/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class ContactSetting extends Model {
  resource() {
    return 'contact_settings'
  }
}

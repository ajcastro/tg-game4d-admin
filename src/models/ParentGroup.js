/* eslint-disable class-methods-use-this */
import Model from './Model'

export default class ParentGroup extends Model {
  resource() {
    return 'parent_groups'
  }
}

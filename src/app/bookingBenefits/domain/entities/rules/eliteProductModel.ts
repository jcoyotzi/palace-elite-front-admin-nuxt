import {injectable} from 'inversify'
import {EliteProductRuleEntity} from './EliteProductRuleEntity'
import {EliteProductRule} from './eliteProductRule'

@injectable()
export default class EliteProductModel implements EliteProductRule {
  constructor() {}

  public hasCompliance(rule: EliteProductRuleEntity): boolean {
    if (rule.events) return rule.events.compliance
    return false
  }
}

import {injectable} from 'inversify'
import {EliteProductRuleEntity} from '../../entities/rules/EliteProductRuleEntity'
import {EliteProductRulesRepository} from './EliteProductRuleRepository'
// @ts-ignore
import PolicyEngine from '@pr-policy-evaluator/lib'

@injectable()
export default class EliteProductRulesServiceRepository implements EliteProductRulesRepository {
  constructor() {}

  async evaluate(fact: any): Promise<EliteProductRuleEntity> {
    return PolicyEngine.startPolicyEngine(fact)
  }
}

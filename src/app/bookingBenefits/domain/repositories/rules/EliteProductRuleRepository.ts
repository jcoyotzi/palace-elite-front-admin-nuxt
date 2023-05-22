import {EliteProductRuleEntity} from '../../entities/rules/EliteProductRuleEntity'

export interface EliteProductRulesRepository {
  evaluate(PolicyToEvaluate: any): Promise<EliteProductRuleEntity>
}

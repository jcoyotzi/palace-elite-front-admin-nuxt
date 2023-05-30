import { RuleEntity } from './../entities/RuleEntity'

export interface RulesRepository {
  evaluate(fact: any): Promise<RuleEntity>
}

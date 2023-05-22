import {RuleEntity} from './RuleEntity'

export interface Rule {
  isAvailable(rule: RuleEntity): boolean
}

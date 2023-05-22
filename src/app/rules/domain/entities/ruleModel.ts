import {injectable} from 'inversify'
import {RuleEntity} from './RuleEntity'
import {Rule} from './rule'

@injectable()
export default class RuleModel implements Rule {
  constructor() {}

  public isAvailable(rule: RuleEntity): boolean {
    return rule.active
  }
}

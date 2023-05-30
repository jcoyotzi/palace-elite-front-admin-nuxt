import {inject, injectable} from 'inversify'
// import httpTypes from '../../../common/types/httpTypes'
import {RuleEntity} from '../entities/RuleEntity'
import {RulesRepository} from './rulesRepository'
// @ts-ignore
import PolicyEngine from '@pr-policy-evaluator/lib'

@injectable()
export default class PropertyServiceRepository implements RulesRepository {
  constructor() {} // private readonly httpJs: HttpApi //@inject(httpTypes.strapiHttpApi)

  async evaluate(fact: any): Promise<RuleEntity> {
    return await PolicyEngine.startPolicyEngine(fact)
    // return this.httpJs.get('/api/properties?populate=deep,5')
  }
}

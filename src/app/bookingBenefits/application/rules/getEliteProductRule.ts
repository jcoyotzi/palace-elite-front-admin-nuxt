import {injectable, inject} from 'inversify'
import UseCase from '../../../common/application/UseCase'
import rulesTypes from '../../../common/types/rulesTypes'
import {
  EliteProductRuleEntity,
  EliteProductRuleRunRequest
} from '../../domain/entities/rules/EliteProductRuleEntity'
import {EliteProductRulesRepository} from '../../domain/repositories/rules/EliteProductRuleRepository'
import {formatPolicyToEvaluate} from '~/src/app/bookingBenefits/domain/policies/GolfPolicie'
@injectable()
export default class GetEliteProductRuleUseCase
  implements UseCase<EliteProductRuleRunRequest, EliteProductRuleEntity>
{
  constructor(
    @inject(rulesTypes.rulesRepository)
    private readonly rulesRepository: EliteProductRulesRepository
  ) {}

  async run(request: EliteProductRuleRunRequest): Promise<EliteProductRuleEntity> {
    return await this.rulesRepository.evaluate(
      formatPolicyToEvaluate(request.policies, request.fact)
    )
  }
}

import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import rulesTypes from '../../common/types/rulesTypes'
import {getStages} from '../domain/data/pipelines'
import {PipelinesEnum} from '../domain/entities/enum/pipelinesEnum'
import {RulesRepository} from '../domain/repositories/rulesRepository'
// import {PropertyMapper} from '../domain/mapper/propertyMapper'
export interface RuleEngineRequest {
  fact: any
  pipeline: PipelinesEnum | string
}

export interface RuleEngineResponse {
  events: any
  overrides: any
}

@injectable()
export default class RunEngineUseCase implements UseCase<RuleEngineRequest, RuleEngineResponse> {
  constructor(
    @inject(rulesTypes.rulesRepository)
    private readonly rulesRepository: RulesRepository
  ) {}

  async run(request: RuleEngineRequest): Promise<any> {
    const stages = getStages[request.pipeline]

    const payload = {
      fact: request.fact,
      stages
    }
    return await this.rulesRepository.evaluate(payload)
  }
}

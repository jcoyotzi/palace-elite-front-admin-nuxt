import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import { CancelationsRepository } from '../domain/repositories/cancelationsRepository'
import { HighDemandWeeks } from '../domain/entities/cancelationsWeeksEntity'

import cancelationsTypes from '../../common/types/cancelationsTypes'

@injectable()
export default class GetWeeksUseCase implements UseCase<null, HighDemandWeeks> {
  constructor(
    @inject(cancelationsTypes.cancelationsRepository) private readonly cancelationsRepository: CancelationsRepository
  ) {}

  async run(): Promise<HighDemandWeeks> {
    const response = await this.cancelationsRepository.getWeeks()
    return response
  }
}

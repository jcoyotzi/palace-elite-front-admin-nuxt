import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import benefitsTypes from '../../common/types/benefitsTypes'
import {BenefitsRepository} from '../domain/repositories/benefitsRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetStrapiResortCreditUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(benefitsTypes.benefitsRepository)
    private readonly benefitsRepository: BenefitsRepository
  ) {}

  async run(): Promise<any> {
    return await this.benefitsRepository.getStrapiResortCreditPage()
  }
}

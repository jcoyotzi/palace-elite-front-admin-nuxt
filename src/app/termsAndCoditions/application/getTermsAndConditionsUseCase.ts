import {injectable, inject} from 'inversify'
import { GetTermsAndConditionsDto } from '../../bookings/domain/dto/getTermsAndConditionsDto'
import UseCase from '../../common/application/UseCase'
import termsAndCoditionsTypes from '../../common/types/termsAndCoditionsTypes'
import { TermsAndConditionsRepository } from '../domain/repositories/termsAndConditionsRepository'

@injectable()
export default class GetTermsAndConditionsUseCase implements UseCase<String, GetTermsAndConditionsDto> {
  constructor(
    @inject(termsAndCoditionsTypes.termsAndConditionsRepository)
    private readonly termsAndConditionsRepository: TermsAndConditionsRepository
  ) {}

  async run(code: string): Promise<GetTermsAndConditionsDto> {
    const response = await this.termsAndConditionsRepository.getTandC(code)
    return response.data!
  }
}

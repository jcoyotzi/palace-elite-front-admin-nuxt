import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import offerTypes from '../../common/types/offerTypes'
import OfferPageDto from '../domain/dto/offerPageDto'
import {OfferRepository} from '../domain/repositories/offerRepository'

@injectable()
export default class GetOfferPageUseCase implements UseCase<null, any> {
  constructor(
    @inject(offerTypes.offerRepository)
    private readonly offerRepository: OfferRepository
  ) {}

  async run(): Promise<OfferPageDto> {
    const response = await this.offerRepository.getOfferPage()
    return response.data!
  }
}

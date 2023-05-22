import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import offerTypes from '../../common/types/offerTypes'
import {PropertiesDto} from '../domain/dto/propertiesDto'
import {OfferRepository} from '../domain/repositories/offerRepository'

@injectable()
export default class GetPropertiesUseCase implements UseCase<null, any> {
  constructor(
    @inject(offerTypes.offerRepository)
    private readonly offerRepository: OfferRepository
  ) {}

  async run(): Promise<PropertiesDto | undefined> {
    const response = await this.offerRepository.getProperties()
    return response.data
  }
}

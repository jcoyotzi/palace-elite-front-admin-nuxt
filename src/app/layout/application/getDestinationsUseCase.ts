import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import layoutTypes from '../../common/types/layoutTypes'
import {LayoutRepository} from '../../layout/domain/repositories/layoutRepository'
import { DestinationMapper } from '../domain/mapper/destinationMapper'

@injectable()
export default class GetDestinationsUseCase implements UseCase<string, any> {
  constructor(
    @inject(layoutTypes.layoutRepository)
    private readonly layoutRepository: LayoutRepository
  ) {}

  async run(locale: string): Promise<any> {
    const response = await this.layoutRepository.getDestinations(locale)
    return DestinationMapper.transform(response?.data?.data)
  }
}

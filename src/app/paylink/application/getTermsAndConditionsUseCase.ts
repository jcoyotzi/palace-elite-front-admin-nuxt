import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'
import {GetTermsAndConditionsDto} from '../../bookings/domain/dto/getTermsAndConditionsDto'
import payLinkTypes from '../../common/types/payLinkTypes'
import CollectionType from '../domain/entities/collectionType'

@injectable()
export default class GetTermsAndConditionsUseCase
  implements UseCase<null, Response<CollectionType[]>>
{
  constructor(
    @inject(payLinkTypes.payLinkRepository)
    private readonly paylinkRepository: PayLinkRepository
  ) {}

  async run(): Promise<Response<CollectionType[]>> {
    return await this.paylinkRepository.getTermsAndConditions()
  }
}

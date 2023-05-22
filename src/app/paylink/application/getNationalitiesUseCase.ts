import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import payLinkTypes from '../../common/types/payLinkTypes'
import {PayLinkRepository} from '../domain/repositories/payLinkRepository'
import {NationalitiesMapper} from '../domain/mapper/NationalitiesMapper'
import {NationalitiesDto} from '../domain/entities/nationalities'

@injectable()
export default class GetNationalitiesUseCase implements UseCase<String, NationalitiesDto[]> {
  constructor(
    @inject(payLinkTypes.payLinkRepository)
    private readonly payLinkRepository: PayLinkRepository
  ) {}

  async run(): Promise<NationalitiesDto[]> {
    const {data} = await this.payLinkRepository.getNationalities()
    return NationalitiesMapper.map(data?.data!)
  }
}

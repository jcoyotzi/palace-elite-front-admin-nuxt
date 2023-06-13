import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import {BPGRepository} from '../domain/repositories/bpgRepository'
import bpgTypes from '../../common/types/bpgTypes'
import SisturPromotion from '../domain/dto/sisturPromotionDto'
import { QueryAffiliation } from '../domain/dto/infoAffiliation'

@injectable()
export default class GetResortCreditsUseCase implements UseCase<QueryAffiliation, Response<SisturPromotion[]>> {
  constructor(
    @inject(bpgTypes.bpgRepository)
    private readonly bpgRepository: BPGRepository
  ) {}

  async run(query: QueryAffiliation): Promise<Response<SisturPromotion[]>> {
    const {data} = await this.bpgRepository.getResortCredits(query)
    return data!
  }
}
import {inject, injectable} from 'inversify'
import userTypes from '../../common/types/userTypes'
import UseCase from '../../common/application/UseCase'
import {UserMemberRepository} from '../domain/repositories/userMemberRepository'
import { IsTransferableBonusDTO } from '../domain/dto/IsTransferableBonusDTO'
import type {IsTransferableResponse} from '../domain/entities/isTransferableBonus'

@injectable()
export default class GetIsTransferableBonusUseCase
implements UseCase<IsTransferableBonusDTO, IsTransferableResponse>
{
  constructor(
    @inject(userTypes.userMemberRepository)
    private readonly userMemberRepository: UserMemberRepository
  ) {}

  async run(dto: IsTransferableBonusDTO): Promise<IsTransferableResponse> {
    const {data} = await this.userMemberRepository.isTransferableBonus(dto)
    // @ts-ignore
    return data.data
  }
}

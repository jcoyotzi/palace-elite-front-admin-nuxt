import {inject, injectable} from 'inversify'
import userTypes from '../../common/types/userTypes'
import UseCase from '../../common/application/UseCase'
import {IsIHRPayload, IsIHRResponse} from '../domain/entities/isIHR'
import {UserMemberRepository} from '../domain/repositories/userMemberRepository'

@injectable()
export default class GetIsIHR
implements UseCase<IsIHRPayload, IsIHRResponse>
{
  constructor(
    @inject(userTypes.userMemberRepository)
    private readonly userMemberRepository: UserMemberRepository
  ) {}

  async run(payload: IsIHRPayload): Promise<IsIHRResponse> {
    const response = await this.userMemberRepository.getIsIHR(payload)
    return response.data!
  }
}
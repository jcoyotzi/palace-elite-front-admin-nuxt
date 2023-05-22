import {inject, injectable} from 'inversify'
import userTypes from '../../common/types/userTypes'
import UseCase from '../../common/application/UseCase'
import {UserInfoMember} from '../domain/entities/userInfoMember'
import {UserMemberRepository} from '../domain/repositories/userMemberRepository'

@injectable()
export default class GetUserMemberByAffiliationNumberUseCase
  implements UseCase<string, UserInfoMember>
{
  constructor(
    @inject(userTypes.userMemberRepository)
    private readonly userMemberRepository: UserMemberRepository
  ) {}

  async run(affiliationNumber: string): Promise<UserInfoMember> {
    const response = await this.userMemberRepository.withAffiliationNumber(affiliationNumber)
    return response.data!
  }
}

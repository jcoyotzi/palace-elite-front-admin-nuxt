import {ContainerModule, interfaces} from 'inversify'
import {UserMemberRepository} from '../user/domain/repositories/userMemberRepository'
import {UserMemberServiceRepository} from '../user/domain/repositories/userMemberServiceRepository'
import UseCase from '../common/application/UseCase'
import {UserInfoMember} from '../user/domain/entities/userInfoMember'
import userTypes from '../common/types/userTypes'
import GetUserMemberByAffiliationNumberUseCase from '../user/application/getUserMemberByAffiliationNumberUseCase'
import {IsTransferableBonusDTO} from '~/src/app/user/domain/dto/IsTransferableBonusDTO'
import GetIsTransferableBonusUseCase from 'app/user/application/getIsTransferableBonusUseCase'
import type {IsTransferableResponse} from 'app/user/domain/entities/isTransferableBonus'
import GetIsIHR from '~/src/app/user/application/getIsIHR'
import type {IsIHRResponse, IsIHRPayload} from 'app/user/domain/entities/isIHR'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<UserMemberRepository>(userTypes.userMemberRepository).to(UserMemberServiceRepository)
  bind<UseCase<string, UserInfoMember>>(userTypes.getUserMemberUseCase).to(
    GetUserMemberByAffiliationNumberUseCase
  )
  bind<UseCase<IsTransferableBonusDTO, IsTransferableResponse>>(
    userTypes.getIsTransferableBonusUseCase
  ).to(GetIsTransferableBonusUseCase)

  bind<UseCase<IsIHRPayload, IsIHRResponse>>(
    userTypes.getIsIHR
  ).to(GetIsIHR)
})

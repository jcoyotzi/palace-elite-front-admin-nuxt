import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import dashboardTypes from '../../common/types/dashboardTypes'
import {DashboardRepository} from '../domain/repositories/dashboardRepository'
import {MembershipPaymentsPayload} from '../domain/dto/membershipPaymentsPayload'
import {MembershipPaymentsDto} from '../domain/dto/membershipPaymentsDto'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetMembershipPaymentsUseCase
  implements UseCase<MembershipPaymentsPayload, Response<MembershipPaymentsDto>>
{
  constructor(
    @inject(dashboardTypes.dashboardRepository)
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async run(payload: MembershipPaymentsPayload): Promise<Response<MembershipPaymentsDto>> {
    return await this.dashboardRepository.getMembershipPayments(payload)
  }
}

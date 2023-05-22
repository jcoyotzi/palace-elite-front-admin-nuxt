import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import dashboardTypes from '../../common/types/dashboardTypes'
import {DashboardRepository} from '../domain/repositories/dashboardRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetDashboardPrivacyNoticiesUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(dashboardTypes.dashboardRepository)
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async run(): Promise<any> {
    try {
      return await this.dashboardRepository.getPrivacyNoticies()
    } catch (e: any) {
      throw e
    }
  }
}

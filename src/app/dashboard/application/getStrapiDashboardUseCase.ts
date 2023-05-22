import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import dashboardTypes from '../../common/types/dashboardTypes'
import {DashboardRepository} from '../domain/repositories/dashboardRepository'
import {Response} from '~/src/app/common/domain/entities/response'

@injectable()
export default class GetStrapiDashboardUseCase implements UseCase<any, Response<any>> {
  constructor(
    @inject(dashboardTypes.dashboardRepository)
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async run(port: any): Promise<any> {
    return await this.dashboardRepository.getStrapiDashboard(port.slug, port.locale)
  }
}

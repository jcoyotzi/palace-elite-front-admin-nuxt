import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import layoutTypes from '../../common/types/layoutTypes'
import {LayoutRepository} from '../../layout/domain/repositories/layoutRepository'
import {PEFooterAdapter} from '~/strapi/adapters/footer/PEFooter.adapter'

@injectable()
export default class GetFooterUseCase implements UseCase<string, any> {
  constructor(
    @inject(layoutTypes.layoutRepository)
    private readonly layoutRepository: LayoutRepository
  ) {}

  async run(locale: string): Promise<any> {
    const response = await this.layoutRepository.getFooter(locale)
    return PEFooterAdapter.blockToComponent(response.data)
  }
}

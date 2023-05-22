import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import layoutTypes from '../../common/types/layoutTypes'
import {LayoutRepository} from '../../layout/domain/repositories/layoutRepository'
import {NavbarEntity} from '../domain/entities/navbarEntity'
import {NavbarMapper} from '../domain/mapper/navbarMapper'

@injectable()
export default class GetNavbarUseCase implements UseCase<string, NavbarEntity> {
  constructor(
    @inject(layoutTypes.layoutRepository)
    private readonly layoutRepository: LayoutRepository
  ) {}

  // @ts-ignore
  async run(locale: string): Promise<NavbarEntity> {
    const response = await this.layoutRepository.getNavbar(locale)
    if (response) {
      // @ts-ignore
      return NavbarMapper.transform(response?.data?.data)
    }
  }
}

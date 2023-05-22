import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import layoutTypes from '../../common/types/layoutTypes'
import {MenuDto} from '../domain/dto/menuDto'
import {MenuEntity} from '../domain/entities/menuEntity'
import {MenuMapper} from '../domain/mapper/menuMapper'
import {LayoutRepository} from '../domain/repositories/layoutRepository'

@injectable()
export default class GetMenuUseCase implements UseCase<string, MenuEntity> {
  constructor(
    @inject(layoutTypes.layoutRepository)
    private readonly layoutRepository: LayoutRepository
  ) {}

  // @ts-ignore
  async run(locale: string): Promise<MenuEntity> {
    try {
      const menu = await this.layoutRepository.getMenu(locale)
      if (menu) {
        // @ts-ignore
        return MenuMapper.transform(menu.data)
      }
    } catch (error) {
      // console.log(error)
      throw error
    }
  }
}

import {injectable} from 'inversify'
import {MenuEntity, MenuTypeOfDeviceEntity} from '../domain/entities/menuEntity'
import {NavbarEntity} from '../domain/entities/navbarEntity'
import {MenuMergeNavbarMapper} from '../domain/mapper/menuMergeNavbarMapper'

@injectable()
export default class MergeMenuDataUseCase {
  run(port: {menu: MenuEntity; navbar: NavbarEntity}): MenuTypeOfDeviceEntity {
    return MenuMergeNavbarMapper.transform(port.menu, port.navbar)
  }
}

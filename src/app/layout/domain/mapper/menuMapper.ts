import { MenuDto } from '../dto/menuDto'
import { MenuEntity } from '../entities/menuEntity'
import { LinksMapper } from './linksMapper'

export class MenuMapper {
  public static transform(menu: MenuDto): MenuEntity {
    return {
      loginLabel: menu.data?.attributes.loginLabel,
      logoutLabel: menu.data?.attributes?.logoutLabel,
      primaryLinks: LinksMapper.getStrapiToLinksMap(menu.data.attributes.primaryLinks),
      secondaryLinks: LinksMapper.getStrapiToLinksMap(menu.data.attributes.secondaryLinks),
      telephone: menu.data?.attributes.telephone.telephone.data?.attributes.telephone
    }
  }
}

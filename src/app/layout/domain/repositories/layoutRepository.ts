import { FooterDto } from '../dto/footerDto'
import { NavbarDto } from '../dto/navbarDto'
import { MenuDto } from '../dto/menuDto'
import { DestinationDataDto } from '../dto/destinationsDto'
import { Response } from '@/src/app/common/domain/entities/response'

export interface LayoutRepository {
  getFooter(locale: string): Promise<Response<FooterDto>>
  getNavbar(locale: string): Promise<Response<NavbarDto>>
  getMenu(locale: string): Promise<Response<MenuDto>>
  getDestinations(locale: string): Promise<Response<DestinationDataDto>>
}

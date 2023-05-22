import {inject, injectable} from 'inversify'
import {FooterDto} from '../dto/footerDto'
import httpTypes from '../../../common/types/httpTypes'
import {NavbarDto} from '../dto/navbarDto'
import {MenuDto} from '../dto/menuDto'
import { DestinationDataDto } from '../dto/destinationsDto'
import {LayoutRepository} from './layoutRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class LayoutServiceRepository implements LayoutRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  async getNavbar(locale: string): Promise<Response<NavbarDto>> {

    const query = [
      'populate[]=topAlertBanner.link.page',
      'populate[]=logo.media',
      'populate[]=logoMobile.media',
      'populate[]=contactUs.page',
      'populate[]=telephone.telephone',
      'populate[]=home.page',
      'populate[]=destinationsAndResorts.properties.media.media',
      'populate[]=destinationsAndResorts.properties.logo.media',
      'populate[]=destinationsAndResorts.properties.link.page',
      'populate[]=destinationsAndResorts.properties.resortCity',
      'populate[]=dashboard.page',
      'populate[]=benefitsWeeks.links.page',
      'populate[]=benefitsPrograms.links.page',
      'populate[]=benefitsWallet.links.page',
      'populate[]=membershipMyInformation.links.page',
      'populate[]=bookings.page',
      'populate[]=offers.page',
      `locale=${locale}`,
    ].join('&');

    return await this.httpJs.get(`/api/navbar?${query}`);
  }

  async getMenu(locale: string): Promise<Response<MenuDto>> {
    return await this.httpJs.get(`/api/menu?populate=deep,3&locale=${locale}`);
  }

  async getFooter(locale: string): Promise<Response<FooterDto>> {
    return await this.httpJs.get(`/api/footer?populate=deep,4&locale=${locale}`);
  }
  
  async getDestinations(locale: string): Promise<Response<DestinationDataDto>> {
    return await this.httpJs.get(`/api/resort-cities?locale=${locale}`);
  }
}

import {inject, injectable} from 'inversify'
import PageRepository from './pageRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import { getCookie } from '~/src/ui/utils/cookieHelper'

@injectable()
export default class PageServiceRepository implements PageRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly http: HttpApi) {}

  async getBySlug(slug: string): Promise<any> {
    const locale = getCookie('i18n_redirected')
    const {data} = await this.http.get(`/api/base-pages?populate=deep,5&filters[slug][$eq]=${slug}&locale=${locale}`)
    return data
  }

  async getHeroWithDescription(locale: string): Promise<any> {
    const {data} = await this.http.get(`api/payment-link?populate=deep&locale=${locale}`);
    return data;
  }

  async getDestinationBySlug(slug: string, locale: string): Promise<any> {
    const {data} = await this.http.get(`/api/destination-and-resort-pages?populate=deep&filters[slug][$eq]=${slug}&locale=${locale}`);
    return data;
  }

  async getOfferBySlug(slug: string, locale: string): Promise<any> {
    const {data} = await this.http.get(`/api/offer-pages?populate=deep&filters[slug][$eq]=${slug}&locale=${locale}`);
    return data;
  }
}

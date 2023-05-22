import {inject, injectable} from 'inversify'
import httpTypes from '../../../common/types/httpTypes'
import {PropertiesDto} from '../dto/propertiesDto'
import offerPageDto from '../dto/offerPageDto'
import {OfferRepository} from './offerRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {getCookie} from '~/src/ui/utils/cookieHelper'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class OfferServiceRepository implements OfferRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  getOfferPage(): Promise<Response<offerPageDto>> {
    const locale = getCookie('i18n_redirected')
    return this.httpJs.get(`/api/base-pages?populate=deep,5&filters[slug][$eq]=offers-${locale}&locale=${locale}`)
  }

  getProperties(): Promise<Response<PropertiesDto>> {
    return this.httpJs.get(`/api/properties?populate=link.page,media.media&locale=${currentLocale()}`)
  }
}

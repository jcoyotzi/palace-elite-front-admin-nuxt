import {injectable, inject} from 'inversify'
import {PayLinkRepository} from './payLinkRepository'
import httpTypes from '~/src/app/common/types/httpTypes'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import PayloadDataReservation from '../entities/payloadDataReservation'
import PayloadPayNowReservation from '../entities/payloadPayNowReservation'
import {GetTermsAndConditionsDto} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import CollectionType from '../entities/collectionType'
import { getCookie } from '~/src/ui/utils/cookieHelper'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class PayLinkServiceRepository implements PayLinkRepository {
  constructor(
    @inject(httpTypes.apiUrlWithoutToken) private readonly http: HttpApi,
    @inject(httpTypes.intelligenceXWithoutToken) private readonly httpLegacy: HttpApi,
    @inject(httpTypes.strapiHttpApi) private readonly httpSpi: HttpApi
  ) {}

  getNationalities(): Promise<Response<any>> {
    const locale = getCookie('i18n_redirected')
    const lang = locale === 'en' ? 'E' : 'S'
    return this.http.get(`/booking/api/v1/nationalities?language=${lang}`)
  }

  getReservationByToken(params: PayloadDataReservation): Promise<Response<any>> {
    return this.httpLegacy.get('/bookings/info-reservation-balance-by-hotel-folio', {params})
  }

  payNowReservation(params: PayloadPayNowReservation): Promise<Response<any>> {
    return this.http.get('/reservations-pay', {params})
  }

  getExChangeRate(payload: any): Promise<Response<any>> {
    return this.httpLegacy.get(`/membership/exchange-rate/${payload.date}/4`, {
      params: {
        'request.country': payload.country,
        'request.currency': payload.currency
      }
    })
  }

  getTermsAndConditions(): Promise<Response<CollectionType[]>> {
    const query = [
      `filters[code][$in][0]=paylink-terms-and-conditions`,
      `filters[code][$in][1]=paylink-booking-conditions`,
      `filters[code][$in][2]=paylink-privacy-noticies`,
      `locale=${currentLocale()}`
    ].join('&');

    return this.httpSpi.get(`/api/terms-and-conditions?${query}`)
  }

  payNow(payload: any): Promise<Response<any>> {
    return this.httpLegacy.post('/bookings/apply-reservation-payment-by-ts-credit', {
      data: payload
    })
  }
}

import {injectable, inject} from 'inversify'
import PayloadGetReservations from '../entities/payloadGetReservations'
import ReservationsDto from '../dto/reservationsDto'
import GetFiltersDto from '../dto/getFiltersDto'
import PayloadGetFilters from '../entities/payloadGetFilters'
import PayloadValidateReservation from '../entities/payloadValidateReservation'
import PayloadPaymentLinkReservation from '../entities/payloadPaymentLinkReservation'
import PayloadRejectReservation from '../entities/payloadRejectReservation'
import {GetProductsAndPaymentsDto} from '../dto/getProductsAndPaymentsDto'
import productsAndPayments from '../entities/productsAndPayments'
import {CompanionsDto} from '../dto/getCompanionsDto'
import companions from '../entities/companions'
import {GetTermsAndConditionsDto} from '../dto/getTermsAndConditionsDto'
import {GetCategoriesDto} from '../dto/getCategoriesDto'
import categories from '../entities/categorie'
import {BookingsRepository} from './bookingsRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'
import {RequestSendConfirmationLetter} from '../entities/requestSendConfirmationLetter'
import {ResponseSendConfirmationLetter} from '../entities/responseSendConfirmationLetter'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'

@injectable()
export default class BookingsServiceRepository implements BookingsRepository {
  constructor(
    @inject(httpTypes.strapiHttpApi) private readonly httpJS: HttpApi,
    @inject(httpTypes.apiUrl) private readonly httpApi: HttpApi,
    @inject(httpTypes.intelligenceXHttpApi) private readonly httpIntelligence: HttpApi
  ) {}

  getReservations(params: PayloadGetReservations): Promise<Response<ReservationsDto>> {
    const {application, company} = params

    delete params.application
    delete params.company

    return this.httpApi.get(
      `/booking/api/v1/application/${application}/company/${company}/reservations`,
      {
        params
      }
    )
  }

  getFilters(params: PayloadGetFilters): Promise<Response<GetFiltersDto>> {
    const {application, company} = params

    delete params.application
    delete params.company

    return this.httpApi.get(
      `/booking/api/v1/application/${application}/company/${company}/booking-filter`,
      {params}
    )
  }

  getReservationsToValidate(params: PayloadGetFilters): Promise<Response<any>> {
    const {application, company} = params

    delete params.application
    delete params.company

    return this.httpApi.get(
      `/booking/api/v1/application/${application}/company/${company}/reservations-to-validate`,
      {params}
    )
  }

  validateReservation(payload: PayloadValidateReservation): Promise<Response<Number>> {
    return this.httpIntelligence.put(`/bookings/validate-reservation`, {
      data: payload
    })
  }

  rejectReservation(payload: PayloadRejectReservation): Promise<any> {
    return this.httpIntelligence.put(`/bookings/process-cancelar-reservation`, {
      data: payload
    })
  }

  sendPaymentLinkReservation(payload: PayloadPaymentLinkReservation): Promise<any> {
    return this.httpApi.post(`/booking/api/v1/reservation/payment-notification`, {data: payload})
  }

  getProductsAndPaymentUseCase(
    payload: productsAndPayments
  ): Promise<Response<GetProductsAndPaymentsDto>> {
    const {hotel, folio, isNational} = payload
    const response = this.httpApi.get(
      `/booking/api/v1/hotel/${hotel}/booking/${folio}/products-and-payments?isNational=${isNational}`
    )
    // SUPLEMENT FEE this.httpApi.get(`/booking/api/v1/hotel/MPG/booking/2033316/products-and-payments?isNational=false`)
    // PRODUCTS this.httpApi.get(`/booking/api/v1/hotel/MPG/booking/2226016/products-and-payments?isNational=false `)
    // PAYMENTS this.httpApi.get(`/booking/api/v1/hotel/MPG/booking/2098077/products-and-payments?isNational=false`)

    // @ts-ignore
    return response
  }

  getCompanions(payload: companions): Promise<Response<CompanionsDto[]>> {
    const {hotel, folio, isNational} = payload
    return this.httpApi.get(
      `/companion/api/v1/hotel/${hotel}/folio/${folio}/companions?isNational=${isNational}`
    )
  }

  getTermsAndConditions(): Promise<Response<GetTermsAndConditionsDto> | undefined> {
    const query = [
      `filters[code][$in][0]=booking-residence`,
      `filters[code][$in][1]=booking-bono`,
      `filters[code][$in][2]=booking-imperial`,
      `filters[code][$in][3]=booking-paid`,
      `filters[code][$in][4]=resort-credit`,
      `locale=${currentLocale()}`
    ].join('&');

    return this.httpJS.get(`/api/terms-and-conditions?${query}`).catch(error => {
      return undefined
    }) as Promise<Response<GetTermsAndConditionsDto> | undefined>
  }

  getCategories(payload: categories): Promise<Response<GetCategoriesDto>> {
    return this.httpJS.get(
      `/api/categories?filters[code][$eq]=${payload.rm_type}&filters[property][externalId][$eq]=${payload.property}&populate=deep,3&locale=${currentLocale()}`
    )
  }

  sendConfirmationLetter(
    payload: RequestSendConfirmationLetter
  ): Promise<Response<ResponseSendConfirmationLetter>> {
    return this.httpIntelligence.post(`/bookings/send/new-confirmation-letter`, {
      data: payload
    })
  }
}

import PayloadGetReservations from '../entities/payloadGetReservations'
import {Response} from '~/src/app/common/domain/entities/response'
import ReservationsDto from '../dto/reservationsDto'
import GetFiltersDto from '../dto/getFiltersDto'
import PayloadGetFilters from '../entities/payloadGetFilters'
import PayloadRejectReservation from '../entities/payloadRejectReservation'
import PayloadValidateReservation from '../entities/payloadValidateReservation'
import PayloadPaymentLinkReservation from '../entities/payloadPaymentLinkReservation'
import ProductsAndPayments from '../entities/productsAndPayments'
import {GetProductsAndPaymentsDto} from '../dto/getProductsAndPaymentsDto'
import Companions from '../entities/companions'
import {CompanionsDto} from '../dto/getCompanionsDto'
import {GetTermsAndConditionsDto} from '../dto/getTermsAndConditionsDto'
import Categorie from '../entities/categorie'
import {GetCategoriesDto} from '../dto/getCategoriesDto'
import {ResponseSendConfirmationLetter} from '../entities/responseSendConfirmationLetter'
import {RequestSendConfirmationLetter} from '../entities/requestSendConfirmationLetter'

export interface BookingsRepository {
  getReservations(payload: PayloadGetReservations): Promise<Response<ReservationsDto>>
  getReservationsToValidate(payload: PayloadGetFilters): Promise<Response<ReservationsDto>>
  getFilters(payload: PayloadGetFilters): Promise<Response<GetFiltersDto>>
  rejectReservation(payload: PayloadRejectReservation): Promise<Response<any>>
  validateReservation(payload: PayloadValidateReservation): Promise<Response<Number>>
  sendPaymentLinkReservation(payload: PayloadPaymentLinkReservation): Promise<Response<any>>
  getProductsAndPaymentUseCase(
    payload: ProductsAndPayments
  ): Promise<Response<GetProductsAndPaymentsDto>>
  getCompanions(payload: Companions): Promise<Response<CompanionsDto[]>>
  getTermsAndConditions(): Promise<Response<GetTermsAndConditionsDto> | undefined>
  getCategories(payload: Categorie): Promise<Response<GetCategoriesDto>>
  sendConfirmationLetter(
    payload: RequestSendConfirmationLetter
  ): Promise<Response<ResponseSendConfirmationLetter>>
}

import {Response} from '@/src/app/common/domain/entities/response'
import ReservationsDto from '~/src/app/bookings/domain/dto/reservationsDto'
import CollectionType from '../entities/collectionType'
import PayloadDataReservation from '../entities/payloadDataReservation'
import PayloadPayNowReservation from '../entities/payloadPayNowReservation'

export interface PayLinkRepository {
  getNationalities(): Promise<Response<any>>
  getReservationByToken(payload: PayloadDataReservation): Promise<Response<ReservationsDto>>
  payNowReservation(payload: PayloadPayNowReservation): Promise<Response<any>>
  getTermsAndConditions(): Promise<Response<CollectionType[]>>
  getExChangeRate(payload: any): Promise<Response<any>>
  payNow(payload: any): Promise<Response<any>>
}

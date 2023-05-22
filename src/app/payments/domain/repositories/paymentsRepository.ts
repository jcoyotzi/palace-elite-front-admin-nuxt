/* Definición de interfaz para Repositorio */

import {CardsCreditEntity} from '../entities/cardsCreditEntity'
import PayloadUpdateCardCredit from '../entities/payloadUpdateCardCredit'
import {Response} from '@/src/app/common/domain/entities/response'
import {Pagination} from '@/src/app/common/domain/entities/pagination'
import {Payload} from '~/src/app/common/domain/entities/payload'
export interface PaymentsRepository {
  getCardCredits(membership: string, isNational: boolean): Promise<any>
  // removeCardCredit(card: CardsCreditEntity): Promise<Response<CardsCreditEntity>>
  // addCardCredit(card: CardsCreditEntity): Promise<Response<CardsCreditEntity>>
  updateCardCredit(params: Payload<PayloadUpdateCardCredit>): Promise<Response<CardsCreditEntity>>
}

import {InfoMemberProvision} from '~/src/app/booking/domain/dto/imperialDto'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {RoomFolio} from '~/src/app/filldatareservation/domain/roomFolio'
import {Context} from '~/src/app/filldatareservation/legacyBin/fillDataReservations'

export interface FolioRequestDto {
  room: ReservationInfo
  roomCode: string[]
  selectedRefundRate: boolean[]
  numberOfSelectedNights: number
  isMultiCategoryEngine: boolean
  currentRoomIndex: number
}

export interface DesPreAssingProvisionRequestDto {
  rmFolio: RoomFolio
  selectedProvition: InfoMemberProvision
  category: number
}

export interface AssignProvisionRequestDto {
  rmFolio: RoomFolio
  context: Context
  provition: Array<InfoMemberProvision>
}

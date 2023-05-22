import {RoomFolio} from '~/src/app/filldatareservation/domain/roomFolio'
import {Context} from '~/src/app/filldatareservation/legacyBin/fillDataReservations'

export interface CreateRoomFolioRespondeDto {
  rmFolio: RoomFolio | undefined
  context: Context
  isProvisional: boolean
  isImperial: boolean
}

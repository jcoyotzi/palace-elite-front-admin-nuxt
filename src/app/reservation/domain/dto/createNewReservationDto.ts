import {RoomFolio} from 'app/filldatareservation/domain/roomFolio'

export interface KeyRestrictionForReservation {
  requiredPasswordToValidateAvailForescast: true
  passwordToValidateAvailForescast: string
  requiredPasswordToValidatedAvail: boolean
  passwordToValidateAvail: string
  requiredPasswordToDuplicateReservation: boolean
  passwordToDuplicateReservation: string
}

export interface NotesRevervation {
  Hotel: string
  Folio: number
  Code: string
  Description: string
  opr: string
}

export interface ReservationBonoValid {
  HotelResvUnlocked: string
  FolioResvUnlocked: number
  Application: number
  Company: number
}
export interface infoRmFolio {
  Reservations: RoomFolio[]
  IsOverride: boolean
  IsNational: boolean
  KeyRestrictionForReservation: KeyRestrictionForReservation
  RecnumPromotions: number[]
  ReservationBonoValid?: ReservationBonoValid
  Notes: NotesRevervation[]
}

export interface CreateNewReservationDto {
  company: number
  isNational: boolean
  application: string
  useRateCodeProcess: boolean
  infoRmFolio: infoRmFolio
}

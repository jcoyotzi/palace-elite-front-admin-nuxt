import {GetModeReservation} from './getModeReservation'

export function ProvisionsModeReservation(
  Room: any,
  ModeReservation: string,
  IsMultiCategoryEngine: boolean,
  CustomReservation: any
) {
  const reservationMode = GetModeReservation(
    Room,
    ModeReservation,
    IsMultiCategoryEngine,
    CustomReservation
  )
  return reservationMode == '7' || reservationMode == '9'
}

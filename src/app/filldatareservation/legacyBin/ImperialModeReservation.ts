import {GetModeReservation} from './getModeReservation'

export function ImperialsModeReservation(
  Room: any,
  ModeReservation: string,
  IsMultiCategoryEngine: boolean,
  CustomReservation: any
) {
  const modeReservation = GetModeReservation(
    Room,
    ModeReservation,
    IsMultiCategoryEngine,
    CustomReservation
  )
  return modeReservation == '3' || modeReservation == '4'
}

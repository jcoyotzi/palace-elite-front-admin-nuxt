import {GetModeReservation} from './getModeReservation'

export function RsvFreeModeReservation(
  Room: any,
  ModeReservation: string,
  IsMultiCategoryEngine: boolean,
  CustomReservation: any,
  __RsvPromotionTargetType: string
) {
  const modeReservation = GetModeReservation(
    Room,
    ModeReservation,
    IsMultiCategoryEngine,
    CustomReservation
  )
  return modeReservation == '2' && __RsvPromotionTargetType == 'free'
}

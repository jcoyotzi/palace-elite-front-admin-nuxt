import {GetModeReservation} from './getModeReservation'

export function BonusModeReservation(
  Room: any,
  modeReservation: any,
  isMultiCategoryEngine: boolean,
  customReservation: any
) {
  return GetModeReservation(Room, modeReservation, isMultiCategoryEngine, customReservation) == '6'
}

import {ReservationTypes} from './reservationTypes'
import {GetReservationType} from '../application/getReservationType'
import {getCurrentSuiteEngine} from './getCurrentSuiteEngine'
import {AgencyNames} from './agencyNames'
import {isProvisionalReservation} from '../application/isProvisionalReservation'
import {isImperialReservation} from '../application/isImperialReservation'

export function getAgency(
  userIsNational: boolean,
  isMultipleCategoryEngine: boolean,
  currentSuiteMultiCategory: string, // Booking.js
  index: number,
  // TODO: Añadir tipo
  currentProvision: any[],
  roomCode: string, // SUP
  roomReservationTypes: ReservationTypes, // preferencial = 2
  reservation: any[],
  room?: string
) {
  const roomCodeFromEngine = getCurrentSuiteEngine(
    isMultipleCategoryEngine,
    currentSuiteMultiCategory,
    roomCode
  )
  const reservationType = new GetReservationType(roomReservationTypes)
  let currentModeReservation = reservationType.run(
    isMultipleCategoryEngine,
    currentSuiteMultiCategory
  )
  const currentRoomCode = room ? room : roomCodeFromEngine

  const agencyByNationality = userIsNational ? AgencyNames.M_PEL_IM : AgencyNames.PEL_IMP

  if (isMultipleCategoryEngine) {
    currentModeReservation = reservationType.run(isMultipleCategoryEngine, currentRoomCode)
  }

  if (currentModeReservation === ReservationTypes.REWARDS) {
    return AgencyNames.PR_ELITE
  } else if (isProvisionalReservation(isMultipleCategoryEngine, currentModeReservation, roomCode)) {
    return userIsNational ? AgencyNames.M_PR_ELITE : AgencyNames.PR_ELITE
  } else if (isImperialReservation(isMultipleCategoryEngine, currentModeReservation, roomCode)) {
    return agencyByNationality
  } else if (currentModeReservation === ReservationTypes.BONO) {
    return userIsNational ? AgencyNames.M_PR_ELITE : AgencyNames.PR_ELITE
  } else if (
    currentModeReservation === ReservationTypes.PREFERENCIAL ||
    currentModeReservation === ReservationTypes.REFERIDOS
  ) {
    return userIsNational ? AgencyNames.M_PR_ELITE : AgencyNames.PR_ELITE
  } else {
    //Combination de semanas
    const provisionSelectedByIndex = currentProvision[index]

    if (provisionSelectedByIndex) {
      const temporalAgency = userIsNational
        ? provisionSelectedByIndex.Agency_cd_nac
        : provisionSelectedByIndex.Agency_cd_ext

      if (!!temporalAgency) {
        return temporalAgency
      }
    } else {
      return agencyByNationality
    }

    return !!reservation[index].Agency ? reservation[index].Agency : agencyByNationality
  }
}

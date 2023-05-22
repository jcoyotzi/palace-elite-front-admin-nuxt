import {InfoUserMember} from '../domain/infoUserMember'
import {GetCurrentSuiteEngine} from './getCurrentSuiteEngine'
import {ImperialsModeReservation} from './ImperialModeReservation'
import {ProvisionsModeReservation} from './provisionModeReservation'
import {GetModeReservation} from './getModeReservation'

export function GetAgency(
  Index: number,
  Room: any,
  ModeReservation: any,
  _IsMultiCategoryEngine: boolean,
  WCtrlSetMember_InfoUserMember: InfoUserMember,
  _CurrentSuiteMultiCategory: string,
  CustomReservation: any,
  __currentProvision: any[],
  _Reservation: any[]
) {
  const currentSuiteEngine = GetCurrentSuiteEngine(
    _IsMultiCategoryEngine,
    _CurrentSuiteMultiCategory,
    Room
  )

  let CurModeReservation = GetModeReservation(
    currentSuiteEngine,
    ModeReservation,
    _IsMultiCategoryEngine,
    CustomReservation
  )

  const CurRoom = Room != undefined ? Room : currentSuiteEngine

  if (_IsMultiCategoryEngine) {
    CurModeReservation = GetModeReservation(
      CurRoom,
      ModeReservation,
      _IsMultiCategoryEngine,
      CustomReservation
    )
  }

  const isImperialReservation = ImperialsModeReservation(
    CurRoom,
    CurModeReservation,
    _IsMultiCategoryEngine,
    CustomReservation
  )

  const isProvisionReservation = ProvisionsModeReservation(
    CurRoom,
    CurModeReservation,
    _IsMultiCategoryEngine,
    CustomReservation
  )

  if (CurModeReservation === '8') {
    return 'PR-ELITE'
  }
  //Incentivas y aniversario
  else if (isProvisionReservation) {
    return WCtrlSetMember_InfoUserMember.UserMember.Isnational ? 'M/PR-ELI' : 'PR-ELITE'
  }
  //Imperiales
  else if (isImperialReservation) {
    return WCtrlSetMember_InfoUserMember.UserMember.Isnational ? 'M/PEL-IM' : 'PEL-IMP'
  } else if (CurModeReservation == 6) {
    return WCtrlSetMember_InfoUserMember.UserMember.Isnational ? 'M/PEL' : 'PEL'
  } else if (CurModeReservation == 2 || CurModeReservation == 5) {
    return WCtrlSetMember_InfoUserMember.UserMember.Isnational ? 'M/PR-ELI' : 'PR-ELITE'
  }
  //Combinacion de semanas
  else {
    if (__currentProvision[Index - 1]) {
      var agencyTmp = WCtrlSetMember_InfoUserMember.UserMember.Isnational
        ? __currentProvision[Index - 1].Agency_cd_nac
        : __currentProvision[Index - 1].Agency_cd_ext
      if (agencyTmp != undefined || agencyTmp != '') {
        return agencyTmp
      }
    } else {
      //si no se ha seleccionado provision se asigna por default:
      return WCtrlSetMember_InfoUserMember.UserMember.Isnational ? 'M/PEL-IM' : 'PEL-IMP'
    }

    return _Reservation[Index].Agency != undefined
      ? _Reservation[Index].Agency
      : WCtrlSetMember_InfoUserMember.UserMember.Isnational
      ? 'M/PEL-IM'
      : 'PEL-IMP'
  }
}

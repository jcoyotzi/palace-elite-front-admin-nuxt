import {stages} from './estanciasMinimas/estanciasMinimas.pipeline'
import {stages as stagesMaximumStay} from './maximumStay/maximumStay.pipeline'
import {stages as stagesSemana52} from './semana52/semana52.pipeline'
import {wholesaleRestrictedReservations} from './wholesaler/wholesaler.pipelines'
import {referralMinPax} from './referral/referral.pipelines'
import {stages as imperialPolicy} from './imperial/imperial.pipeline'
import {cancelations} from './cancelations/cancelations.pipelines'
import {baglioniPaxes} from './baglioniPaxes/baglioniPaxes.pipeline'

export const getStages: {[index: string]: any} = {
  stayMinimal: stages,
  semana52: stagesSemana52,
  referralMinPax: referralMinPax,
  wholesaler_reservations_restricted: wholesaleRestrictedReservations,
  imperialPolicy: imperialPolicy,
  cancelations: cancelations,
  baglioni_paxes: baglioniPaxes,
  stayMaximal: stagesMaximumStay
}

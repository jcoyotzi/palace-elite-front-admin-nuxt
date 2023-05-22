import {BookingNowDto} from '../dto/bookingNowDto'
import {ImperialProvitionRequest, ProvitionsRequest} from '../dto/provitionsRequest'
import {ImperialDto} from '../dto/imperialDto'
import PayloadGetReservation from '../dto/payloadGetReservation'
import {ReferralProgram} from 'app/booking/domain/dto/referralProgram'
import {Response} from 'app/common/domain/entities/response'

export interface BookingRespository {
  post(booking: BookingNowDto): Promise<void>
  getReferralProgram(
    market: string,
    application: string,
    company: string,
    year: string
  ): Promise<Response<ReferralProgram>>

  getReferralPromotionBenefits(application: string, arrivalDate: string): Promise<Response<any>>

  getProvitions(request: ProvitionsRequest): Promise<Response<any>>

  getImperialProvitions(request: ImperialProvitionRequest): Promise<Response<Response<ImperialDto>>>

  getReservation(payload: PayloadGetReservation): Promise<Response<any>>

  getMinimumStay(payload: {application: string}): Promise<Response<any>>
}

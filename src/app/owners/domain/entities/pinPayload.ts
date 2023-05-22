import {PinActions} from '../enum/pinActions'
import {PinPayloadDto} from '../dto/pinPayloadDto'
import {Payload} from '~/src/app/common/domain/entities/payload'

export interface PinPayload {
  payload: Payload<PinPayloadDto>
  application: string
  company: number
  isNational: boolean | undefined | null
  action: PinActions
}

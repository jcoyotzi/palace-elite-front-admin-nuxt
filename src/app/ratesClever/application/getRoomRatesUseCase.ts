import {inject, injectable} from 'inversify'
import UseCase from '~/src/app/common/application/UseCase'
import ratesCleverTypes from '~/src/app/common/types/ratesCleverTypes'
import {RatesCleverRepository} from '~/src/app/ratesClever/domain/repositories/ratesCleverRepository'
import {RoomRatesClever} from '~/src/app/ratesClever/domain/entities/roomRatesClever'
import RoomRatesCleverRawMapper from '~/src/app/ratesClever/domain/mappers/roomRatesCleverRawMapper'
import {RatesCleverPayloadDto} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {lazyApiCalls} from 'app/ratesClever/infrastructure/lazyApiCalls'
import {InfantsGrouped} from 'app/booking/domain/mapper/infantGrouping'
import { LockOffRoomAccessCode, PresidentialSecondRoomCodes } from '../../roomAccess/domain/data/lockOffRoomAccessCode'

export interface RatesCleverPayloadByHotelDto {
  payload: RatesCleverPayloadDto
  propertyCode: string
}

@injectable()
export default class GetRoomRatesUseCase
  implements UseCase<RatesCleverPayloadByHotelDto, RoomRatesClever>
{

  constructor(
    @inject(ratesCleverTypes.RatesCleverRespository)
    private readonly ratesRepository: RatesCleverRepository
  ) {}

  async run(port: RatesCleverPayloadByHotelDto): Promise<any> {

    const portRefundable = Object.assign({}, port.payload)

    if (
      LockOffRoomAccessCode.includes(portRefundable.roomCodes[0].code) &&
      !portRefundable.roomCodes[0].isLockOff
    ) {

      const {firstRoomWithPaxes, secondRoomWithPaxes} = this.presidentialPaxesDistribution(
        2,
        portRefundable.adult,
        portRefundable.infants.children,
        portRefundable.infants.kids,
        portRefundable.infants.babies
      )

      portRefundable.adult = firstRoomWithPaxes.adult
      portRefundable.infants.children = firstRoomWithPaxes.child
      portRefundable.infants.kids = firstRoomWithPaxes.kid
      portRefundable.infants.babies = firstRoomWithPaxes.baby
    }

    if (PresidentialSecondRoomCodes.includes(portRefundable.roomCodes[0].code)) {

      const {firstRoomWithPaxes, secondRoomWithPaxes} = this.presidentialPaxesDistribution(
        2,
        portRefundable.adult,
        portRefundable.infants.children,
        portRefundable.infants.kids,
        portRefundable.infants.babies
      )

      portRefundable.adult = secondRoomWithPaxes.adult
      portRefundable.infants.children = secondRoomWithPaxes.child
      portRefundable.infants.kids = secondRoomWithPaxes.kid
      portRefundable.infants.babies = secondRoomWithPaxes.baby
    }

    const portNonRefundable = Object.assign({}, portRefundable)
    portNonRefundable.isRefundable = false

    const ratesResponse = await Promise.allSettled([
      this.ratesRepository.get(portRefundable),
      this.ratesRepository.get(portNonRefundable)
    ])

    const dataRefundable: any = ratesResponse[0]
    const dataNonRefundable: any = ratesResponse[1]

    const mapper = new RoomRatesCleverRawMapper(dataRefundable.value, dataNonRefundable.value)
    return mapper.map()
  }

  private presidentialPaxesDistribution(
    firstRoomMaxPax: number,
    adults: number,
    childs: number,
    kids: number,
    babys: number
  ) {
    let firstRoomWithPaxes = {
      adult: 0,
      child: 0,
      baby: 0,
      kid: 0
    }

    let secondRoomWithPaxes = {
      adult: 0,
      child: 0,
      baby: 0,
      kid: 0
    }

    const totalPaxes = adults + childs + babys + kids

    if (totalPaxes > firstRoomMaxPax) {
      firstRoomWithPaxes.adult = firstRoomMaxPax
    }

    if (totalPaxes === firstRoomMaxPax) {
      firstRoomWithPaxes.adult = Math.floor(totalPaxes / 2)
    }

    secondRoomWithPaxes.adult = totalPaxes - firstRoomWithPaxes.adult

    return {
      firstRoomWithPaxes,
      secondRoomWithPaxes
    }
  }

}

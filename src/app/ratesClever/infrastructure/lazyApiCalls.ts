/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 7 9:47:58
 *
 */

import {
  CleverRoomCode,
  RatesCleverPayloadDto
} from 'app/ratesClever/domain/dto/RatesCleverPayloadDto'
import {RatesCleverRepository} from 'app/ratesClever/domain/repositories/ratesCleverRepository'
import RoomRatesCleverRawMapper from 'app/ratesClever/domain/mappers/roomRatesCleverRawMapper'
import {getRoomsSorted, RoomSort} from 'app/ratesClever/infrastructure/getRoomsSorted'
import {
  LockOffRoomAccessCode,
  PresidentialSecondRoomCodes
} from '../../roomAccess/domain/data/lockOffRoomAccessCode'

// region Closure helpers to compose
export const splitPayload = (payload: RatesCleverPayloadDto, step: number, hotelCode: string) => {
  const {roomCodes} = payload

  const roomCodesSorted = sortCategories(roomCodes, hotelCode)

  let result = []
  let count = 0
  let stepCodes = []

  for (const code of roomCodesSorted) {
    // console.log("CODE: ", code)
    stepCodes.push(code)
    count += 1
    if (count === step || LockOffRoomAccessCode.includes(code.code)) {
      result.push(stepCodes)
      count = 0
      stepCodes = []
    }
  }

  result.push(stepCodes)

  return result
}

function sortCategories(categiries: CleverRoomCode[], hotelCode: string) {
  const roomOrder = getRoomsSorted(hotelCode)

  categiries.sort(function (categoryA, categoryB) {
    // @ts-ignore
    const defaultSort: RoomSort = {
      orderPosition: roomOrder.length
    }

    const categoryToSortA =
      roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryA.code) ?? defaultSort
    const categoryToSortB =
      roomOrder.find(indexedRoom => indexedRoom.roomCode === categoryB.code) ?? defaultSort

    return categoryToSortA?.orderPosition - categoryToSortB?.orderPosition
  })

  return categiries
}

export const getPayloadSteps = (
  payload: RatesCleverPayloadDto,
  step: number,
  hotelCode: string
) => {
  const roomCodesSteps = splitPayload(payload, step, hotelCode)

  const steps = roomCodesSteps.map(codes => {
    let original = JSON.parse(JSON.stringify(payload))
    original.roomCodes = codes
    return original
  })
  return steps.filter(step => step.roomCodes.length > 0)
}
// endregion

export const lazyApiCalls = (
  payload: RatesCleverPayloadDto,
  step: number,
  ratesRepository: RatesCleverRepository,
  hotelCode: string
) => {
  // region Internal State
  let payloads = getPayloadSteps(payload, step, hotelCode)

  let data: any = []
  let index = 0
  let paxes
  // endregion

  // region Closure expossed method
  return async () => {
    if (index >= payloads.length) {
      index = 0
      return JSON.parse(JSON.stringify(data))
    }

    // console.log('payloads: ', payloads, index, data, payloads[index])

    const portRefundable = Object.assign({}, payloads[index])

    if (
      LockOffRoomAccessCode.includes(portRefundable.roomCodes[0].code) &&
      !portRefundable.roomCodes[0].isLockOff
    ) {
      // debugger

      const {firstRoomWithPaxes, secondRoomWithPaxes} = presidentialPaxesDistribution(
        2,
        portRefundable.adult,
        portRefundable.infants.children,
        portRefundable.infants.kids,
        portRefundable.infants.babies
      )

      portRefundable.adult = firstRoomWithPaxes.adult
      portRefundable.child = firstRoomWithPaxes.child
      portRefundable.kid = firstRoomWithPaxes.kid
      portRefundable.baby = firstRoomWithPaxes.baby
    }

    if (PresidentialSecondRoomCodes.includes(portRefundable.roomCodes[0].code)) {
      const {firstRoomWithPaxes, secondRoomWithPaxes} = presidentialPaxesDistribution(
        2,
        portRefundable.adult,
        portRefundable.infants.children,
        portRefundable.infants.kids,
        portRefundable.infants.babies
      )

      portRefundable.adult = secondRoomWithPaxes.adult
      portRefundable.child = secondRoomWithPaxes.child
      portRefundable.kid = secondRoomWithPaxes.kid
      portRefundable.baby = secondRoomWithPaxes.baby
    }

    const portNonRefundable = Object.assign({}, portRefundable)
    portNonRefundable.isRefundable = false

    const ratesResponse = await Promise.allSettled([
      ratesRepository.get(portRefundable),
      ratesRepository.get(portNonRefundable)
    ])
    index += 1

    const dataRefundable: any = ratesResponse[0]
    const dataNonRefundable: any = ratesResponse[1]

    if (dataRefundable.status === 'rejected') {
      console.error('RatesClever (IntelligenceX) Service is out of service. Retry later!')
      throw new Error('RatesClever (IntelligenceX) Service is out of service. Retry later!')
    }

    const mapper = new RoomRatesCleverRawMapper(dataRefundable.value, dataNonRefundable.value)
    const mappedStepData = mapper.map()
    data = data.concat(mappedStepData)

    return JSON.parse(JSON.stringify(data))
  }
  // endregion

  function presidentialPaxesDistribution(
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

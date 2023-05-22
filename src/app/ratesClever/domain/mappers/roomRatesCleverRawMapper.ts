/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 2:0:11
 *
 */

import {
  RoomRatesCleverCategory,
  RoomRatesCleverFullResponseFull,
  RoomRatesCleverResponse,
  RoomRatesCleverResponseDto
} from '~/src/app/ratesClever/domain/entities/roomRatesClever'
import {Response} from '~/src/app/network/common/domain/entity/response'
import {Pagination} from '~/src/app/network/common/domain/entity/pagination'

export default class RoomRatesCleverRawMapper {
  constructor(
    private readonly dataRefundable: Response<Pagination<RoomRatesCleverResponse>>,
    private readonly dataNonRefundable: Response<Pagination<RoomRatesCleverResponse>>
  ) {}
  map(): any {
    //@ts-ignore
    const refundable: RoomRatesCleverResponse = this.dataRefundable.data
    //@ts-ignore
    const nonRefundable: RoomRatesCleverResponse = this.dataNonRefundable.data
    let result: any = this.mapRooms(refundable, nonRefundable)
    // console.log(result)
    return result
  }

  private mapRooms(
    itemRefundable: RoomRatesCleverResponse,
    itemNonRefundable: RoomRatesCleverResponse
  ) {
    const roomsRefundable: RoomRatesCleverResponseDto[] = itemRefundable.data.rooms
    const roomsNonRefundable: RoomRatesCleverResponseDto[] = itemNonRefundable.data.rooms
    const result = []
    for (let i = 0; i < roomsRefundable.length; i++) {
      const nonRefundable = roomsNonRefundable.find(
        roomNR => roomNR.roomCode === roomsRefundable[i].roomCode
      )
      result.push(this.mapRoomFlow(roomsRefundable[i], nonRefundable ?? roomsNonRefundable[i]))
    }
    return result
  }

  private mapRoomFlow(
    item: RoomRatesCleverResponseDto,
    itemNonRefundable: RoomRatesCleverResponseDto
  ) {
    return {
      currency: 'USD',
      isLockOff: item.isLockOff ?? itemNonRefundable.isLockOff ?? false,
      pricesPerNight: item.dailyRate.map((dayRate: any) => ({
        date: dayRate.date,
        price: Math.ceil(dayRate.rate),
        regularPrice: dayRate.regularRate
      })),
      pricesNonRefundablePerNight: itemNonRefundable.dailyRate.map((dayRate: any) => ({
        date: dayRate.date,
        price: Math.ceil(dayRate.rate),
        regularPrice: dayRate.regularRate
      })),
      refundable: item !== undefined ? this.sortCategoryByProvisionUsage(item.category) : [],
      nonRefundable:
        itemNonRefundable !== undefined
          ? this.sortCategoryByProvisionUsage(itemNonRefundable.category)
          : [],
      roomCode: item.roomCode
    }
  }

  private sortCategoryByProvisionUsage(categiries: RoomRatesCleverCategory[]) {
    const categoriesOrder: any = {
      PREFERENCIAL: 0,
      REFERIDOS: 1,
      'IMP WEEKS': 2,
      BONO: 3,
      ANIVERSARIO: 4,
      INCENTIVA: 5
    }

    categiries.sort(function (categoryA, categoryB) {
      return categoriesOrder[categoryA.code] - categoriesOrder[categoryB.code]
    })

    return categiries
  }
}

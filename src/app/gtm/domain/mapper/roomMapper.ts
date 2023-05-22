// Mapper RoomBookingEntity to RoomInfoDetail

import {RoomInfoDetail} from '../types/RoomInfoDetail'
import {RoomBookingEntity} from '~/src/app/booking/domain/entities/roomBookingEntity'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'

export function getRoomsFromBooking(roomBookingEntity: RoomBookingEntity[]): RoomInfoDetail[] {
  return roomBookingEntity.map(room => ({
    numberOfGuests: room.adults + room.children,
    numberOfAdults: room.adults,
    numberOfChildren: room.children
  }))
}

export function getRoomsFromReservationInfo(
  roomBookingEntity: ReservationInfo[]
): RoomInfoDetail[] {
  return roomBookingEntity.map(room => ({
    numberOfGuests: room.roomsPax.adults + room.roomsPax.children,
    numberOfAdults: room.roomsPax.adults,
    numberOfChildren: room.roomsPax.children,
    provision: room.roomSelected?.selectedOption?.code ?? '',
    roomName: (room.roomSelected?.selectedCategory.description ?? '').replace("UpSell:", ""),
    roomPrice: room.roomSelected?.selectedOption?.rate ?? 0
  }))
}

export function getPaidRoomsFromReservationInfo(
  roomBookingEntity: ReservationInfo[],
  hotelName: string
): RoomInfoDetail[] {
  return roomBookingEntity.map(room => ({
    numberOfGuests: room.roomsPax.adults + room.roomsPax.children,
    numberOfAdults: room.roomsPax.adults,
    numberOfChildren: room.roomsPax.children,
    provision: room.roomSelected?.selectedOption?.code ?? '',
    roomName: (room.roomSelected?.selectedCategory.description ?? '').replace("UpSell:", ""),
    roomPrice: room.roomSelected?.selectedOption?.rate ?? 0,
    roomOrder: hotelName + '-' + String(room.folio)
  }))
}

export function getTotalGuestsFromBooking(roomBookingEntity: RoomBookingEntity[]): RoomInfoDetail {
  const numberOfGuests = roomBookingEntity.reduce((acc, room) => {
    return acc + room.adults + room.children
  }, 0)

  const numberOfAdults = roomBookingEntity.reduce((acc, room) => {
    return acc + room.adults
  }, 0)

  const numberOfChildren = roomBookingEntity.reduce((acc, room) => {
    return acc + room.children
  }, 0)

  return {
    numberOfGuests,
    numberOfAdults,
    numberOfChildren
  }
}

export function getTotalGuestsFromReservationInfo(
  roomBookingEntity: ReservationInfo[]
): RoomInfoDetail {
  const numberOfGuests = roomBookingEntity.reduce((acc, room) => {
    return acc + room.roomsPax.adults + room.roomsPax.children
  }, 0)

  const numberOfAdults = roomBookingEntity.reduce((acc, room) => {
    return acc + room.roomsPax.adults
  }, 0)

  const numberOfChildren = roomBookingEntity.reduce((acc, room) => {
    return acc + room.roomsPax.children
  }, 0)

  return {
    numberOfGuests,
    numberOfAdults,
    numberOfChildren
  }
}

export function getTotalAmountRooms(reservationInfo: ReservationInfo[]): number {
  const amount = reservationInfo.reduce((acc, room) => {
    return acc + room.roomSelected?.selectedOption?.rate! ?? 0
  }, 0)

  return Number(amount.toFixed(2))
}

export function getTotalAmountServices(reservationInfo: ReservationInfo[]): number {
  const amount = reservationInfo.reduce((acc, room) => {
    return (
      acc +
      room.benefits!.reduce((acb, benefit) => {
        return acb + benefit.totalPrice
      }, 0)
    )
  }, 0)

  return Number(amount.toFixed(2))
}

import {
  hotelRooms,
  baglioniHotelsWithBono,
  EvaluateHotelRoom
} from '~/src/app/common/domain/enums/roomTypes'
import {EnumRoomCategory} from '~/src/app/rules/domain/entities/enum/pipelinesEnum'

export function getRoomType({hotelCode, roomCode}: EvaluateHotelRoom): EnumRoomCategory {
  const roomTypes = new Map<string, EnumRoomCategory>()
  /* if hotelCode is not defined or hotelCode is not an key of hotelRooms array */
  if (!hotelCode || !(hotelCode in hotelRooms)) return EnumRoomCategory.ESPECIAL
  const {specialSuites, standardSuites, presidentialSuites, residenceSuites, villaSuites} =
    hotelRooms[hotelCode as keyof typeof hotelRooms]

  specialSuites.forEach(item => {
    roomTypes.set(item, EnumRoomCategory.ESPECIAL)
  })

  standardSuites.forEach(item => {
    roomTypes.set(item, EnumRoomCategory.ESTANDARD)
  })

  presidentialSuites.forEach(item => {
    roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
  })

  residenceSuites.forEach(item => {
    roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
  })

  villaSuites.forEach(item => {
    roomTypes.set(item, EnumRoomCategory.PRESIDENTIAL)
  })

  return roomTypes.get(roomCode) || EnumRoomCategory.ESPECIAL
}

export function evaluateBaglioniRoomForBono({hotelCode, roomCode}: EvaluateHotelRoom) {
  if (!hotelCode || !roomCode) return false

  const baglioniAvailableHotels = Object.keys(baglioniHotelsWithBono)

  if (!baglioniAvailableHotels.includes(hotelCode)) return false

  const baglioniAvailableRooms =
    baglioniHotelsWithBono[hotelCode as keyof typeof baglioniHotelsWithBono]

  return baglioniAvailableRooms.includes(roomCode)
}

import {RoomBookingEntity, RoomBookingEntityForPayload} from '../entities/roomBookingEntity'
export default function roomFactory(id = 0): RoomBookingEntity[] {
  return [
    {
      id,
      name: '',
      adults: 2,
      children: 0,
      childrenages: []
    }
  ]
}

export function roomForPayloadFactory(id = 0): RoomBookingEntityForPayload[] {
  return [
    {
      id,
      name: '',
      adults: 2,
      children: 0,
      babies: 0,
      kids: 0,
      childs: 0,
      childrenages: [],
      infants: {
        kids: 0,
        children: 0,
        babies: 0,
        adults: 0
      }
    }
  ]
}

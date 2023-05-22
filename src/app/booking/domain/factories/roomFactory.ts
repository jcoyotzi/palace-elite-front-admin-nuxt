import {RoomBookingEntity} from '../entities/roomBookingEntity'
export default function RoomFactory(): RoomBookingEntity[] {
  return [
    {
      id: 0,
      name: '',
      adults: 2,
      children: 0,
      childrenages: []
    }
  ]
}

import {RoomBookingEntity} from '~/src/app/booking/domain/entities/roomBookingEntity'
import {infantGrouping, RuleGrouping} from '~/src/app/booking/domain/mapper/infantGrouping'

export function formatBaglioniRoom(room: RoomBookingEntity, rules: RuleGrouping) {
  let adult = room.adults
  const infants = infantGrouping(room.childrenages as string[], rules)
  if (infants.adults) {
    adult += infants.adults
  }
  return {
    adults: adult,
    babies: infants.babies,
    children: 0,
    childs: infants.children,
    kids: infants.kids,
    infants
  }
}

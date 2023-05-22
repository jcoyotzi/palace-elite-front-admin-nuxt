import {RoomAccess} from '../../../roomAccess/domain/entities/roomAccess'
import {CategoryEntity} from '../../domain/entities/category'

export interface AccessibleCategories extends CategoryEntity, RoomAccess {
  language?: string
}

export function mapmemberCategories(
  categories: CategoryEntity[] | null,
  memberCategories: RoomAccess[] | null
): AccessibleCategories[] | [] {

  const filteredCategories = categories?.flatMap((category: CategoryEntity) => {
    const roomAccess: RoomAccess | undefined = memberCategories?.find((room: RoomAccess) => {

      const isRoomLockOff = room?.isLockOff ?? false

      return room.RealCode === category.code && isRoomLockOff === category.isLockoff
    })

    if (roomAccess) {
      return {
        ...roomAccess,
        ...category
      }
    }

    return []
  })
  return filteredCategories || []
}

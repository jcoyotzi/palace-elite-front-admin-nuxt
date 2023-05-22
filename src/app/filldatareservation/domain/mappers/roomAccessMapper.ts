import {injectable} from 'inversify'
import {RoomAccess as RoomAccessFillRevservation} from 'app/filldatareservation/domain/roomAccess/roomAccess'
import {Category as CategoryFillRevservation} from 'app/filldatareservation/domain/roomAccess/roomCategory'
import {RoomAccess} from 'app/roomAccess/domain/entities/roomAccess'
import {Category} from 'app/roomAccess/domain/entities/roomCategory'

@injectable()
export class RoomAccessMapper {
  public map(roomAccess: RoomAccess[]): RoomAccessFillRevservation[] {
    roomAccess.filter(item => {
      return item.Category._ExcludeInternet === false
    })

    return roomAccess.map(item => {
      return {
        ...item,
        IsLockOff: item.isLockOff,
        Category: this.mapCategory(item.Category)
      }
    })
  }

  mapCategory(category: Category): CategoryFillRevservation {
    return {
      Recnum: category._Recnum,
      Hotel: category._Hotel,
      Rmtype: category._Rmtype,
      Type: category._Type,
      IsDouble: category._IsDouble,
      IsPartwho: category._IsPartwho,
      IsPartOne: category._IsPartOne,
      RmtypeRelated: category._RmtypeRelated,
      ExcludeInternet: category._ExcludeInternet,
      ReservationCostType: category._ReservationCostType,
      Amenities: category._Amenities,
      Images: category._Images
    }
  }
}

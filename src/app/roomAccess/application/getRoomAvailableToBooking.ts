import {inject, injectable} from 'inversify'
import {GetRoomTypeAccessDto} from '../domain/dto/getRoomTypeAccessDto'
import {RoomAccess} from '../domain/entities/roomAccess'
import roomAccessTypes from '../../common/types/roomAccessTypes'
import {GetRoomTypeAccessByHotelAffiliation} from './getRoomTypeAccessByHotelAffiliation'
import UseCase from 'app/common/application/UseCase'

@injectable()
export default class GetRoomAvailableToBooking
implements UseCase<GetRoomTypeAccessDto, RoomAccess[]>
{
  constructor(
    @inject(roomAccessTypes.getRoomTypeAccessByHotelAffiliation)
    private readonly getRoomTypeAccessByHotelAffiliation: GetRoomTypeAccessByHotelAffiliation
  ) {}

  async run(roomTypeAccessDto: GetRoomTypeAccessDto): Promise<RoomAccess[]> {
    return await this.getRoomTypeAccessByHotelAffiliation.run(roomTypeAccessDto)
  }
}

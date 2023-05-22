import {inject, injectable} from 'inversify'
import UseCase from '../../../app/common/application/UseCase'
import {GetRoomTypeAccessDto} from '../../../app/roomAccess/domain/dto/getRoomTypeAccessDto'
import {RoomAccess} from '../../../app/roomAccess/domain/entities/roomAccess'
import roomAccessTypes from '../../../app/common/types/roomAccessTypes'
import {RoomAccessRepository} from '../../../app/roomAccess/domain/repositories/roomAccessRepository'

@injectable()
export class GetRoomTypeAccessByHotelAffiliation
implements UseCase<GetRoomTypeAccessDto, RoomAccess[]>
{
  constructor(
    @inject(roomAccessTypes.roomAccessRepository)
    private readonly roomAccessRepository: RoomAccessRepository
  ) {}

  async run(port: GetRoomTypeAccessDto): Promise<RoomAccess[]> {
    const response = await this.roomAccessRepository.getHotelAccessByHotelAffiliation(port)
    return response.data!
  }
}

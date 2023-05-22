import {inject, injectable} from 'inversify'
import {RoomAccess} from '../entities/roomAccess'
import {Response} from '../../../network/common/domain/entity/response'
import httpTypes from '../../../common/types/httpTypes'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import {GetRoomTypeAccessDto} from '../dto/getRoomTypeAccessDto'
import {axiosResponse} from '../../../network/utils/axiosResponse'
import {RoomAccessRepository} from './roomAccessRepository'
import {RoomsCamelCaseToLegacy} from 'app/roomAccess/domain/roomsCamelCaseToLegacy'

@injectable()
export class RoomAccessServiceRepository implements RoomAccessRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  // TODO: set new namingConvention api for roomAccess
  async getHotelAccessByHotelAffiliation(
    request: GetRoomTypeAccessDto
  ): Promise<Response<RoomAccess[]>> {
    /* const result: any = await this.http.get('membership/room-type-access', {

     params: {
       'requestDTO.arvDate': request.arrivalDate,
       'requestDTO.deptDate': request.departureDate,
       'requestDTO.company': request.company,
       'requestDTO.application': request.affiliationNumber,
       'requestDTO.hotel': request.hotel,
       'requestDTO.searchAvailability': request.searchAvailability
     }
   }) */

    const result: any = await this.http.post('/bookings/room-access-with-availability', {
      data: {
        arvDate: request.arrivalDate,
        deptDate: request.departureDate,
        company: request.company,
        application: request.affiliationNumber,
        hotel: request.hotel,
        searchAvailability: request.searchAvailability,
        promotions: request.promotions,
        allRoomsAcces: false
      }
    })

    /* const result: any = await this.http.get('/bookings/room-access-with-availability', {
      params: {
        arvDate: request.arrivalDate,
        deptDate: request.departureDate,
        company: request.company,
        application: request.affiliationNumber,
        hotel: request.hotel,
        searchAvailability: request.searchAvailability
      }
    }) */

    return {
      data: RoomsCamelCaseToLegacy(result.data.data)
    }
  }
}

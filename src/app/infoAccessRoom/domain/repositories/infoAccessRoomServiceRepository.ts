import {inject, injectable} from 'inversify'
import {InfoAccessRoom} from '../infoAccessRoom'
import {Response} from '../../../common/domain/entities/response'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import httpTypes from '../../../common/types/httpTypes'
import {GetRoomAccessByAffiliation} from '../dto/getRoomAccessByAffiliation'
import {InfoAccessRoomRepository} from './infoAccessRoomRepository'

@injectable()
export default class InfoAccessRoomServiceRepository implements InfoAccessRoomRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  async all({
    company,
    includeDetails,
    affiliation
  }: GetRoomAccessByAffiliation): Promise<Response<InfoAccessRoom>> {
    return await this.http.get('/room/info', {
      params: {
        'infoAccessRoomRequestDTO.company': company,
        'infoAccessRoomRequestDTO.application': affiliation,
        'infoAccessRoomRequestDTO.includeDetails': includeDetails
      }
    })
  }
}

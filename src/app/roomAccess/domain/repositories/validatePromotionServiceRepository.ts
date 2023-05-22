import {inject, injectable} from 'inversify'
import {RoomAccess} from '../entities/roomAccess'
import {Response} from '../../../network/common/domain/entity/response'
import httpTypes from '../../../common/types/httpTypes'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import { ValidatePromotionDto } from '../dto/validatePromotionDto'
import {ValidatePromotionRepository} from './validatePromotionRepository'

@injectable()
export class ValidatePromotionServiceRepository implements ValidatePromotionRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly http: HttpApi) {}

  async getPromotionActive(request: ValidatePromotionDto): Promise<Response<RoomAccess[]>> {
    try {
      const result: any = await this.http.post('/bookings/validate-promotion', {data: request})

      return {
        data: result.data
      }
    } catch (error) {
      
    }


    return [] as any
    
       
  }
    
}

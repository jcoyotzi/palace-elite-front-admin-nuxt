import {inject, injectable} from 'inversify'
import {ValidatePromotionDto} from '../domain/dto/validatePromotionDto'
import {RoomAccess} from '../domain/entities/roomAccess'
import roomAccessTypes from '../../common/types/roomAccessTypes'
import { getValidatePromotionActive } from './getValidatePromotionActive'
import UseCase from 'app/common/application/UseCase'

@injectable()
export default class ValidatePromotion
implements UseCase<ValidatePromotionDto, RoomAccess[]>
{
  constructor(
    @inject(roomAccessTypes.getValidatePromotionActive)
    private readonly getPromotionActive: getValidatePromotionActive
  ) {}

  async run(validatePromotionDto: ValidatePromotionDto): Promise<RoomAccess[]> {
    return await this.getPromotionActive.run(validatePromotionDto)
  }
}

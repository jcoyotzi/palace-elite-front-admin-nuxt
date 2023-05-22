import {inject, injectable} from 'inversify'
import UseCase from '../../../app/common/application/UseCase'
import {RoomAccess} from '../../../app/roomAccess/domain/entities/roomAccess'
import roomAccessTypes from '../../../app/common/types/roomAccessTypes'
import {ValidatePromotionRepository} from '../../../app/roomAccess/domain/repositories/validatePromotionRepository'
import {ValidatePromotionDto} from '../domain/dto/validatePromotionDto'

@injectable()
export class getValidatePromotionActive implements UseCase<ValidatePromotionDto, RoomAccess[]> {
  constructor(
    @inject(roomAccessTypes.validatePromotionRepository)
    private readonly validatePromotionRepository: ValidatePromotionRepository
  ) {}

  async run(port: ValidatePromotionDto): Promise<RoomAccess[]> {
    const response = await this.validatePromotionRepository.getPromotionActive(port)
    return response.data!
  }
}

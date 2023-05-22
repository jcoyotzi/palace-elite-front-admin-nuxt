import {inject, injectable} from 'inversify'
import UseCase from '../../common/application/UseCase'
import propertyTypes from '../../common/types/propertyTypes'
import {PropertyAccessRequestDto} from '../domain/dto/PropertyAccessDto/PropertyAccessRequestDto'
import {PropertiesAccessRepository} from '../domain/repositories/propertiesAccessRepository'
import {PropertiesAcccessMapper} from '../domain/mapper/propertiesAcccessMapper'
import {propertyAccessEntity} from '../domain/entities/propertyAccessEntity'

@injectable()
export default class GetPropertyAccessUseCase
  implements UseCase<PropertyAccessRequestDto, propertyAccessEntity[]>
{
  constructor(
    @inject(propertyTypes.propertiesAccessRepository)
    private propertiesAccessRepository: PropertiesAccessRepository
  ) {}

  async run(params: PropertyAccessRequestDto): Promise<any> {
    const response = await this.propertiesAccessRepository.get(params)
    this.persistMemberAccess(response)
    return {
      properties: PropertiesAcccessMapper.map(response.data?.data.Hoteles || []),
      accessBaglioni: response.data?.data?.AccessBaglioni || false
      // accessBaglioni: false
    }
  }

  private persistMemberAccess(response: any): void {
    if (process.client) {
      const member = response.data?.data.Member
      const memberExtension = response.data?.data.MemberExtension
      const toLocalStorage = {member, memberExtension}
      localStorage.setItem('MemberPropertyAccess', JSON.stringify(toLocalStorage))
    }
  }
}

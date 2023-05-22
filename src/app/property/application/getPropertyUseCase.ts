import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import propertyTypes from '../../common/types/propertyTypes'
import {PropertyEntity} from '../domain/entities/propertyEntity'
import {PropertyRepository} from '../domain/repositories/propertyRepository'
import {PropertyMapper} from '../domain/mapper/propertyMapper'

@injectable()
export default class GetPropertyUseCase implements UseCase<string, PropertyEntity[]> {
  constructor(
    @inject(propertyTypes.propertyRepository)
    private readonly propertyRepository: PropertyRepository
  ) {}

  async run(locale: string): Promise<PropertyEntity[]> {
    const response = await this.propertyRepository.get(locale)
    return PropertyMapper.map(response.data?.data || [])
  }
}

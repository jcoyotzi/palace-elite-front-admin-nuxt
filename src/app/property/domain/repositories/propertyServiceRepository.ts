import {inject, injectable} from 'inversify'
import {PropertyDto} from '../dto/propertyDto'
import httpTypes from '../../../common/types/httpTypes'
import {PropertyRepository} from './propertyRepository'
import {Response} from '~/src/app/common/domain/entities/response'
import {HttpApi} from '~/src/app/network/common/domain/entity/httpApi'

@injectable()
export default class PropertyServiceRepository implements PropertyRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  get(locale: string): Promise<Response<PropertyDto>> {
    return this.httpJs.get(`/api/properties?populate=deep,3&locale=${locale}`)
  }
}

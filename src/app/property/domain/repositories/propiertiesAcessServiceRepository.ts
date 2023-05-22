import {inject, injectable} from 'inversify'
import {PropertyAccessDto} from '../dto/PropertyAccessDto/PropertyAccessDto'
import {PropertyAccessRequestDto} from '../dto/PropertyAccessDto/PropertyAccessRequestDto'
import {PropertiesAccessRepository} from './propertiesAccessRepository'
import {HttpJS} from '~/src/app/common/jsonServer/domain/httpJS'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'

@injectable()
export default class PropertyAccessServiceRepository implements PropertiesAccessRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpJS) {}

  get(params: PropertyAccessRequestDto): Promise<Response<PropertyAccessDto>> {
    let baglioniQuery = ''
    if (true) { // process.env.baglioni
      baglioniQuery = `?arvDate=${params.arvDate}`
    }
    return this.httpJs.get(
      `/hotel/hotel-user-acess/application/${params.affiliationId}/company/${params.company}/isNational/${params.isNational}${baglioniQuery}`
    )
  }
}

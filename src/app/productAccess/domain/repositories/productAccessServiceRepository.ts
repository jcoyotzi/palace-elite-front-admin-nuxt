import {inject, injectable} from 'inversify'
import {ProductAccessDto} from '~/src/app/productAccess/domain/dto/productAccessDto'
import {
  ProductAccessRequestDto,
  clubType
} from '~/src/app/productAccess/domain/dto/productAccessRequestDto'
import {ProductAccessRepository} from '~/src/app/productAccess/domain/repositories/productAccessRepository'
import {HttpJS} from '~/src/app/common/jsonServer/domain/httpJS'
import {Response} from '~/src/app/common/domain/entities/response'
import httpTypes from '~/src/app/common/types/httpTypes'

@injectable()
export default class ProductAccessServiceRepository implements ProductAccessRepository {
  constructor(@inject(httpTypes.intelligenceXHttpApi) private readonly httpJs: HttpJS) {}

  get(params: ProductAccessRequestDto): Promise<Response<ProductAccessDto>> {
    return this.httpJs.get(
      `/dashboard/info-products/company/${params.company}/application/${params.application}/arvDate/${params.arrivalDate}?clubType=${clubType.PalaceElite}`
    )
  }
}

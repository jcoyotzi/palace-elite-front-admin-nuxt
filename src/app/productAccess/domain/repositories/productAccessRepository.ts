import {ProductAccessDto} from '../dto/productAccessDto'
import {ProductAccessRequestDto} from '../dto/productAccessRequestDto'
import {Response} from '~/src/app/common/domain/entities/response'

export interface ProductAccessRepository {
  get(params: ProductAccessRequestDto): Promise<Response<ProductAccessDto>>
}

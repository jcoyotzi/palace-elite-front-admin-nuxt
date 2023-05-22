import {inject, injectable} from 'inversify'
import UseCase from '../../common/application/UseCase'
import productAccessTypes from '../../common/types/productAccessTypes'
import {ProductAccessEntity} from '../domain/entities/productAccess'
import {ProductAccessRepository} from '../domain/repositories/productAccessRepository'
import {ProductAccessRequestDto} from '../domain/dto/productAccessRequestDto'
import {ProductAccessMapper} from '../domain/mappers/productAccessMapper'
import {ProductAccessDto} from '../domain/dto/productAccessDto'

@injectable()
export default class GetProductAccessUseCase
  implements UseCase<ProductAccessRequestDto, Array<ProductAccessEntity>>
{
  constructor(
    @inject(productAccessTypes.productAccessRepository)
    private ProductAccessRepository: ProductAccessRepository
  ) {}

  async run(params: ProductAccessRequestDto): Promise<Array<ProductAccessEntity>> {
    const response = await this.ProductAccessRepository.get(params)
    return ProductAccessMapper.map(response?.data?.data || ({} as ProductAccessDto['data']))
  }
}

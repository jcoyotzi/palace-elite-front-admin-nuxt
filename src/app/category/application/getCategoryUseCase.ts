import {injectable, inject} from 'inversify'
import {CategoryEntity} from '../domain/entities/category'
import {CategoryMapper} from '../domain/mapper/category'
import {CategoryRepository} from '../domain/repositories/categoryRepository'
import categoryTypes from '../../common/types/categoryTypes'
import UseCase from '../../common/application/UseCase'
import {CategoryData} from 'app/category/domain/dto/categoryDto'
import { currentLocale } from '~/src/ui/utils/currentLocaleByCookie'
export interface CategoryPayload {
  hotelCode: string
}
@injectable()
export default class GetCategoryUseCase implements UseCase<CategoryPayload, CategoryEntity[]> {
  constructor(
    @inject(categoryTypes.categoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async run({hotelCode}: CategoryPayload): Promise<CategoryEntity[]> {
    const response = await this.categoryRepository.get(hotelCode, 1, currentLocale())
    let pageCount = response.data?.meta.pagination.pageCount
    pageCount = (pageCount || 0) - 1
    let data: CategoryData[] = response.data?.data || []

    if (pageCount >= 1) {
      const nextPages = new Array(pageCount).fill(undefined).map((v, i) => i + 2)

      for await (const page of nextPages) {
        const responseNext = await this.categoryRepository.get(hotelCode, page, currentLocale())
        data = data.concat(responseNext.data?.data || [])
      }
    }

    return CategoryMapper.map(data)
  }
}

import {ContainerModule, interfaces} from 'inversify'
import categoryTypes from '../common/types/categoryTypes'
import {CategoryRepository} from '../../app/category/domain/repositories/categoryRepository'
import CategoryServiceRepository from '../../app/category/domain/repositories/categoryServiceRepository'
import GetCategoryUseCase from './application/getCategoryUseCase'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<CategoryRepository>(categoryTypes.categoryRepository).to(CategoryServiceRepository)
  bind<GetCategoryUseCase>(categoryTypes.getCategoryUseCase).to(GetCategoryUseCase)
})

import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'
import Categorie from '../domain/entities/categorie'
import {GetCategoriesDto} from '../domain/dto/getCategoriesDto'

@injectable()
export default class GetCategorieUseCase implements UseCase<Categorie, Response<GetCategoriesDto>> {
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: Categorie): Promise<Response<GetCategoriesDto>> {
    return await this.bookingsRepository.getCategories(payload)
  }
}

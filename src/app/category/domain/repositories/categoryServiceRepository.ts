import {inject, injectable} from 'inversify'
import {CategoryDto} from '../dto/categoryDto'
import httpTypes from '../../../common/types/httpTypes'
import {Response} from '../../../common/domain/entities/response'
import {HttpApi} from '../../../network/common/domain/entity/httpApi'
import {CategoryRepository} from './categoryRepository'

@injectable()
export default class CategoryServiceRepository implements CategoryRepository {
  constructor(@inject(httpTypes.strapiHttpApi) private readonly httpJs: HttpApi) {}

  get(hotelCode: string, page: number, locale: string, pageSize: number = 100): Promise<Response<CategoryDto>> {

    const query = [
      `populate=gallery.media,urlVirtualTour,amenitiesIcons`,
      `pagination[pageSize]=${pageSize}`,
      `pagination[page]=${page}`,
      `filters[property][externalId][$eq]=${hotelCode}`,
      `locale=${locale}`,
    ].join('&');

    return this.httpJs.get(`/api/categories?${query}`)
  }
}

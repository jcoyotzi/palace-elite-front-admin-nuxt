import {HttpResponse} from '@/src/app/common/domain/entities/httpResponse'
import {Pagination} from '@/src/app/common/domain/entities/pagination'

export interface HttpPagination<T> extends HttpResponse<Pagination<T>> {
  data?: Pagination<T>
}

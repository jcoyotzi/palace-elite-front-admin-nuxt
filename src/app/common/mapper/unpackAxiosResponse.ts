/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 9 / 22 2:17:28
 *
 */

import {Response} from 'app/network/common/domain/entity/response'
import {Pagination} from 'app/network/common/domain/entity/pagination'

export default function unpackAxiosResponse<T>(data: Response<Pagination<T>>): T[] {
  if ('data' in data) {
    const pagination: Pagination<T> = data.data!
    const isAxiosPagination =
      'currentPage' in pagination && 'items' in pagination && 'lastPage' in pagination
    if (isAxiosPagination) {
      return pagination.items
    }
    return [pagination as T]
  }
  return []
}

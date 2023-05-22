import {Response} from '@/src/app/common/domain/entities/response'
import {HttpConfig} from '@/src/app/common/domain/entities/httpConfig'

export interface Http {
  get<U, T>(path: string, config?: HttpConfig<U>): Promise<Response<T>>
  post<U, T>(path: string, config?: HttpConfig<U>): Promise<Response<T>>
  put<U, T>(path: string, config?: HttpConfig<U>): Promise<Response<T>>
  patch<U, T>(path: string, config?: HttpConfig<U>): Promise<Response<T>>
  delete<U, T>(path: string, config?: HttpConfig<U>): Promise<Response<T>>
}

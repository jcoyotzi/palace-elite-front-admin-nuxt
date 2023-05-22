import {Generic} from '@/src/app/common/domain/entities/generic'

export interface HttpConfig<T> {
  body?: T
  params?: Generic
}

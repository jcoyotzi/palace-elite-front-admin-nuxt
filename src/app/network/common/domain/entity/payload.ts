import {ResponseType} from 'axios'
import {Generic} from './generic'
export interface Payload<T> {
  data?: T
  headers?: Generic
  params?: Generic
  responseType?: ResponseType
}

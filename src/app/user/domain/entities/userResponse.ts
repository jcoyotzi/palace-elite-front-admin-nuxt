import {Response} from '@/src/app/common/domain/entities/response'

export interface User {
  affiliation_id: '952e741f-42cb-4f67-b507-a97de65f8fb9'
  name: 'Mary'
  lastname: 'Jane'
  country_resident: 'Cayman Islands'
  email: 'rdzul@palaceresorts.com'
  bussiness_name: 'Miss'
}

export type UserResponse = Response<User>

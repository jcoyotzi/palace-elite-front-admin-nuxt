import {Response} from '@/src/app/common/domain/entities/response'

export interface AffiliationCredentials {
  affiliation_id: '952e741f-42cb-4f67-b507-a97de65f8fb9'
  email: 'rdzul@palaceresorts.com'
  affiliationNumber: '112345665612122'
}

export type AffiliationCredentialsResponse = Response<AffiliationCredentials>

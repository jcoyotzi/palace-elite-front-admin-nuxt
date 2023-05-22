export interface IsIHRPayload {
  hotel: string
  folio: number
  agencyCode: string
  contract: string
}

export interface IsIHRResponse {
  IsDoMemberPaymentByPanamanian: boolean
}

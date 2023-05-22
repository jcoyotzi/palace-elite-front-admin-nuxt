enum MaillType {
  DEFAUTL,
  CONFIRMATIONS,
  TRIP_VALIDATION
}

export interface Emailentity {
  recipientsMail: string
  subject: string
  message: string
  type?: MaillType
  cco?: string
  cc: string
}

export interface RequestSendConfirmationLetter {
  application: string
  company: number
  reservations: any[]
  isNational: boolean
  requeridHTML: number
  emailToConfirmation: string
}

export interface Reservation {
  Hotel: string
  Folio: number
  Arv_date: Date
  Depart_dt: Date
  Status: string
  Guest_cd: string
  Rm_type: string
  Extension: Extension
}

export interface Extension {
  Refundable: boolean
}

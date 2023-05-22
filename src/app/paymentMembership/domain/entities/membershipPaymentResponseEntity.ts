export interface Message {
  _TextMessage: string
  _Type: number
  _SendToPay: boolean
  _OverrideToLoad: any
}

export interface MessageList {
  _Messages: Message[]
  _MustStopBank: boolean
  _MustStop: boolean
  _SubGroupAgency: string
  _Agency: any
  _Application: any
  _Company: number
  _MemberType: any
  _Points: number
  _SendToLogin: boolean
  _GroupAgency: any
  _IdDocto: number
  _Consecutive: number
  _MessagesExtras: any
  Reservations: any
}

export interface MembershipPaymentResponse {
  Member: any
  AnnualFee: number
  LateFee: number
  ExchangeRate: number
  MessageList: MessageList
  NumberAnnualFees: number
  AdminFee: number
  MemberExtension: any
  Concord: false
  IsRecoveryFee: false
  LateFeeType: string
}

export default interface MembershipPaymentResponseDto {
  data: MembershipPaymentResponse
}

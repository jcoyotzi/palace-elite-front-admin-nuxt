/* eslint-disable no-use-before-define */

export enum PaymentProductId {
  'UC' = 77
}
export interface PayNowPayloadDto {
  request: Request
  application: string
  company: number
  isNational: boolean
  isOnlyReservationPayment: boolean
  isCodeVPC: boolean
}

export interface Request {
  paymentRequest: RequestPaymentRequest
  postOnly: boolean
  isMember: boolean
  hotel: string
  folio: number
  reservationAmount: number
  exchangeRate: number
  currencyCharge: string
  airfarePayment: null
  groundTransportAmount: number
  payType: number
  authId: string
  msi: number
  reservationsToPay: ReservationsToPay[]
  isIHR: boolean
  paymentDoneByPanamanian: boolean
  isPremierReservation: boolean
  eWalletMovementRequest: EWalletMovementRequest | {}
  isWithPurse: boolean
  logTermsAndCond: null
  transactionId: number
  uniqueId: string
}

export interface EWalletMovementRequest {
  Application: string
  Hotel: string
  HotelOpera: string
  IdProducto: PaymentProductId
  Idcuenta: string
  Idprofile: string
  Idptovta: number
  Movementtype: string
  Movementvalue: number
}

export interface RequestPaymentRequest {
  IsSaveTsCreditPreferential: boolean
  Company: number
  Application: string
  IsNational: boolean
  _type: number
  _response: null
  Response: null
  Type: number
  TypeText: string
  paymentRequest: PaymentRequestPaymentRequest
  CC: Cc
  Bank: null
  RespetarBanco: boolean
  PalaceReference: null
  PalaceUniqueID: null
  testMode: boolean
  ValidaAVS: boolean
  Hotel: string
  Cia: string
  ArrivalDate: string
  DepartureDate: string
  Operation: string
  OperationDescription: null
  Room: null
  PalaceAuthID: null
  EntUser: null
  SalesOperation: null
  Division: string
  MSI: boolean
  NumPagos: number
  SoloAutorizacion: boolean
  IHR: boolean
  PER: boolean
  PCINode: null
  ConfirmationNo: null
  Tag: null
  AuthInfo: null
}

export interface Cc {
  firstNameField: string
  middleNameField: string
  lastNameField: string
  lastName2Field: null
  emailField: null
  phoneField: null
  amountField: number
  currencyField: string
  payment_typeField: string
  monthsInterestFreeField: number
  numberField: string
  securityCodeField: string
  expMMField: string
  expYYField: string
  addressField: string
  zipCodeField: string
  stateField: string
  state_MEXField: number
  state_USAField: number
  state_CANField: number
  cityField: string
  countryField: null
  country_ISO3Field: string
  languageField: null
  districtField: null
  municipalityField: null
  cardTypeField: string
}

export interface PaymentRequestPaymentRequest {
  ccField: Cc
  bankField: null
  respetarBancoField: boolean
  palaceReferenceField: null
  palaceUniqueIDField: null
  testModeField: boolean
  validaAVSField: boolean
  hotelField: null
  ciaField: null
  arrivalDateField: string
  departureDateField: string
  operationField: string
  operationDescriptionField: null
  roomField: null
  palaceAuthIDField: null
  entUserField: null
  salesOperationField: null
  divisionField: string
  mSIField: boolean
  numPagosField: number
  soloAutorizacionField: boolean
  iHRField: boolean
  pERField: boolean
  pCINodeField: null
  confirmationNoField: null
  tagField: null
  authInfoField: null
}

export interface ReservationsToPay {
  Hotel: string
  Folio: number
  Rm_type: string
  AmountToPay: number
  HotelName: string
}

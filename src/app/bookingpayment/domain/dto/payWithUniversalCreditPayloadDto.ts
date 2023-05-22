/* eslint-disable no-use-before-define */
export interface PayWithUniversalCreditPayloadDto {
  application:            string;
  company:                number;
  isNational:             boolean;
  paymentRequest:         PayWithUniversalCreditPayloadDtoPaymentRequest;
  postOnly:               boolean;
  isMember:               boolean;
  hotel:                  string;
  folio:                  number;
  reservationAmount:      number;
  exchangeRate:           number;
  currencyCharge:         string;
  groundTransportAmount:  number;
  account:                number;
  reservationsToPay:      ReservationsToPay[];
  merchantCode:           string;
  isPremierReservation:   boolean;
  eWalletMovementRequest: EWalletMovementRequest;
  isWithPurse:            boolean;
  postOnlyMovement:       boolean;
  transactionId:          number;
  uniqueId:               string;
}

export interface EWalletMovementRequest {
  Application:   string;
  Hotel:         string;
  HotelOpera:    string;
  IdProducto:    number;
  Idcuenta:      string;
  Idprofile:     string;
  Idptovta:      number;
  Movementtype:  string;
  Movementvalue: number;
}

export interface PayWithUniversalCreditPayloadDtoPaymentRequest {
  IsSaveTsCreditPreferential: boolean;
  Company:                    number;
  Application:                string;
  IsNational:                 boolean;
  _type:                      number;
  _response:                  null;
  Response:                   null;
  Type:                       number;
  TypeText:                   string;
  paymentRequest:             PaymentRequestPaymentRequest;
  CC:                         Cc;
  Bank:                       string;
  RespetarBanco:              boolean;
  PalaceReference:            string;
  PalaceUniqueID:             string;
  testMode:                   boolean;
  ValidaAVS:                  boolean;
  Hotel:                      string;
  Cia:                        string;
  ArrivalDate:                string;
  DepartureDate:              string;
  Operation:                  string;
  OperationDescription:       string;
  Room:                       string;
  PalaceAuthID:               string;
  EntUser:                    string;
  SalesOperation:             string;
  Division:                   string;
  MSI:                        boolean;
  NumPagos:                   number;
  SoloAutorizacion:           boolean;
  IHR:                        boolean;
  PER:                        boolean;
  PCINode:                    string;
  ConfirmationNo:             string;
  Tag:                        string;
  AuthInfo:                   AuthInfo;
}

export interface AuthInfo {
  ent_UserField: string;
  ent_PassField: string;
  ent_TermField: string;
}

export interface Cc {
  firstNameField:          string;
  middleNameField:         string;
  lastNameField:           string;
  lastName2Field:          string;
  emailField:              string;
  phoneField:              string;
  amountField:             number;
  currencyField:           string;
  payment_typeField:       string;
  monthsInterestFreeField: number;
  numberField:             string;
  securityCodeField:       string;
  expMMField:              string;
  expYYField:              string;
  addressField:            string;
  zipCodeField:            string;
  stateField:              string;
  state_MEXField:          number;
  state_USAField:          number;
  state_CANField:          number;
  cityField:               string;
  countryField:            string;
  country_ISO3Field:       number;
  languageField:           string;
  districtField:           string;
  municipalityField:       string;
  cardTypeField:           string;
}

export interface PaymentRequestPaymentRequest {
  ccField:                   Cc;
  bankField:                 string;
  respetarBancoField:        boolean;
  palaceReferenceField:      string;
  palaceUniqueIDField:       string;
  testModeField:             boolean;
  validaAVSField:            boolean;
  hotelField:                string;
  ciaField:                  string;
  arrivalDateField:          string;
  departureDateField:        string;
  operationField:            string;
  operationDescriptionField: string;
  roomField:                 string;
  palaceAuthIDField:         string;
  entUserField:              string;
  salesOperationField:       string;
  divisionField:             string;
  mSIField:                  boolean;
  numPagosField:             number;
  soloAutorizacionField:     boolean;
  iHRField:                  boolean;
  pERField:                  boolean;
  pCINodeField:              string;
  confirmationNoField:       string;
  tagField:                  string;
  authInfoField:             AuthInfo;
}

export interface ReservationsToPay {
  Hotel:       string;
  Folio:       number;
  Rm_type:     string;
  AmountToPay: number;
  HotelName:   string;
}

import {Pinia, Store} from 'pinia-class-component'
import payLinkTypes from '~/src/app/common/types/payLinkTypes'
import {lazyInject} from '~/src/container'
import GetNationalitiesUseCase from '~/src/app/paylink/application/getNationalitiesUseCase'
import {NationalitiesDto} from '~/src/app/paylink/domain/entities/nationalities'
import BookingPaymentForm from '~/src/app/paylink/domain/entities/bookingPaymentForm'
import PayloadDataReservation from '~/src/app/paylink/domain/entities/payloadDataReservation'
import GetReservationByTokenUseCase from '~/src/app/paylink/application/getReservationByTokenUseCase'
import PayloadPayNowReservation from '~/src/app/paylink/domain/entities/payloadPayNowReservation'
import PayNowReservationUseCase from '~/src/app/paylink/application/payNowReservationUseCase'
import bookingPaymentTypes from '~/src/app/common/types/bookingPaymentTypes'
import UseCase from '~/src/app/common/application/UseCase'
import Exception from '~/src/app/network/common/domain/entity/Exception'
import GetPropertiesUseCase from '~/src/app/contact/aplication/getPropertiesUseCase'
import GetTermsAndConditionsUseCase from '~/src/app/paylink/application/getTermsAndConditionsUseCase'
import {UseAuth} from './auth'
//@ts-ignore
import CollectionType from '~/src/app/paylink/domain/entities/collectionType'
import {ToastDuration} from '~/src/ui/utils/toastHelpers'
import {ToastOptions} from 'vue-toasted/types/index'
import {PaymentConfirmationContentEntity} from '~/src/app/bookingpayment/domain/entities/paymentConfirmationContentEntity'
import GetPaymentConfirmationContentUseCase from '~/src/app/bookingpayment/application/paymentConfirmationContentUseCase'
import GetExChangeRateUseCase from '~/src/app/paylink/application/getExChangeRateUseCase'
import GuestPaylink from '~/src/app/paylink/domain/entities/GuestPaylink'
import { ReservationStatus } from '~/src/app/paylink/domain/enums/reservationStatus'

@Store({
  name: 'payLinkStore'
})
export class PayLinkStore extends Pinia {
  @lazyInject(payLinkTypes.getNationalitiesUseCase)
  private readonly getNationalitiesUseCase!: GetNationalitiesUseCase

  @lazyInject(payLinkTypes.getPropertiesUseCase)
  private readonly getPropertiesUseCase!: GetPropertiesUseCase

  @lazyInject(payLinkTypes.getTermsAndConditionsUseCase)
  private readonly getTermsAndConditionsUseCase!: GetTermsAndConditionsUseCase

  @lazyInject(payLinkTypes.getReservationByTokenUseCase)
  private readonly getReservationByTokenUseCase!: GetReservationByTokenUseCase

  @lazyInject(payLinkTypes.payNowReservationUseCase)
  private readonly payNowReservationUseCase!: PayNowReservationUseCase

  @lazyInject(payLinkTypes.payNowUseCase)
  private readonly payNowUseCase!: UseCase<any, any>

  @lazyInject(bookingPaymentTypes.paymentConfirmationContentUsecase)
  private readonly paymentConfirmationContent!: GetPaymentConfirmationContentUseCase

  @lazyInject(payLinkTypes.getExChangeRateUseCase)
  private readonly getExChangeRateUseCase!: GetExChangeRateUseCase

  public nationalities: NationalitiesDto[] = []

  public tcPaymentResponse: any = null

  public collectionTypeTerms?: CollectionType[] = []

  public confirmationContent: PaymentConfirmationContentEntity | null = null

  public bookingPayment: BookingPaymentForm = {
    nationalitie: {
      text: '',
      value: ''
    },
    holderName: '',
    number: '',
    expiration: '',
    securityCode: '',
    currency: '',
    cardStamp: '',
    address: '',
    zip: '',
    state: {
      text: '',
      value: ''
    },
    city: '',
    country: {
      text: '',
      value: ''
    }
  }

  public guestPaylink: GuestPaylink[] = []

  public showReservationCancelled: boolean = false

  public showLoading: boolean = false

  public reservationBalance: number = 0

  public showLoadingPayNow: boolean = false

  public showLoadingPage: boolean = true

  public reservation?: any

  public showModalTermsAndConditions: boolean = false

  public showModalPrivacyNoticies: boolean = false

  public showModalBookingConditions: boolean = false

  public properties: any = []

  public exchangeRate: number = 20.55 // TODO: Obtener tipo de cambio real

  public reservationSuccessPaid: boolean = false

  get getTypeField(): string {
    switch(this.bookingPayment?.cardStamp) {
      case 'VISA':
      case 'V':
      case 'DINERS':
      case 'DISCOVER':
        return 'VISA';
      case 'MC':
      case 'MASTERCARD':
        return 'MC'
      case 'AMEX':
      case 'AEX':
        return 'AMEX'
      default:
        return  'OTHER';
    }
  }

  get tcPayload(): any {
    return {
      request: {
        paymentRequest: {
          IsSaveTsCreditPreferential: false, //si es tarjeta nueva "false" y guardada "true"
          Company: this.reservation?.Extension?.Company,
          Application: this.reservation?.Extension?.Application,
          IsNational: this.authStore.isNational || false,
          _type: 0,
          _response: null,
          Response: null,
          Type: 0,
          TypeText: '',
          paymentRequest: {
            ccField: {
              firstNameField: this.bookingPayment?.holderName, //aqui usar card holder full
              middleNameField: '',
              lastNameField: '',
              lastName2Field: null,
              emailField: null,
              phoneField: null,
              amountField: 0,
              currencyField: this.bookingPayment?.currency, //currency
              payment_typeField: 'SinglePayment',
              monthsInterestFreeField: 0,
              numberField: this.bookingPayment?.number || '', //number card
              securityCodeField: this.bookingPayment?.securityCode || '', //cvv
              expMMField: this.bookingPayment?.expiration.substr(0, 1), //month
              expYYField: this.bookingPayment?.expiration.substr(3, 4), //year
              addressField: this.bookingPayment?.address,
              zipCodeField: this.bookingPayment?.zip,
              stateField: this.bookingPayment?.state?.text,
              state_MEXField: 0,
              state_USAField: 0,
              state_CANField: 0,
              cityField: this.bookingPayment?.city,
              countryField: this.bookingPayment?.country?.text, //country remplazar valor por el del form
              country_ISO3Field: this.bookingPayment?.country?.value || 'USA',
              languageField: null,
              districtField: null,
              municipalityField: null,
              cardTypeField: this.getTypeField //tipo de tarjeta de credito, usar enum "typesCards"
            },
            bankField: null,
            respetarBancoField: false,
            palaceReferenceField: null,
            palaceUniqueIDField: null,
            testModeField: false,
            validaAVSField: false,
            hotelField: null,
            ciaField: null,
            arrivalDateField: this.reservation?.Arv_date, //fechas de reserva
            departureDateField: this.reservation?.Depart_dt, //fechas de reserva
            operationField: 'Payment',
            operationDescriptionField: null,
            roomField: null,
            palaceAuthIDField: null,
            entUserField: null,
            salesOperationField: null,
            divisionField: 'CALLCENTER',
            mSIField: false,
            numPagosField: 0,
            soloAutorizacionField: false,
            iHRField: false,
            pERField: false,
            pCINodeField: null,
            confirmationNoField: null,
            tagField: null,
            authInfoField: null
          },
          CC: {
            firstNameField: this.bookingPayment?.holderName,
            middleNameField: '',
            lastNameField: '',
            lastName2Field: null,
            emailField: null,
            phoneField: null,
            amountField: 0,
            currencyField: this.bookingPayment?.currency,
            payment_typeField: 'SinglePayment',
            monthsInterestFreeField: 0,
            numberField: this.bookingPayment?.number || '', //number card
            securityCodeField: this.bookingPayment?.securityCode || '', //cvv
            expMMField: this.bookingPayment?.expiration.substr(0, 2), //month
            expYYField: this.bookingPayment?.expiration.substr(3, 4), //year
            addressField: this.bookingPayment?.address,
            zipCodeField: this.bookingPayment?.zip,
            stateField: this.bookingPayment?.state?.text,
            state_MEXField: 0,
            state_USAField: 0,
            state_CANField: 0,
            cityField: this.bookingPayment?.city,
            countryField: this.bookingPayment?.country?.text,
            country_ISO3Field: this.bookingPayment?.country?.value || 'USA',
            languageField: null,
            districtField: null,
            municipalityField: null,
            cardTypeField: this.getTypeField //tipo de tarjeta de credito, usar enum "typesCards"
          },
          Bank: null,
          RespetarBanco: false,
          PalaceReference: null,
          PalaceUniqueID: null,
          testMode: false,
          ValidaAVS: false,
          Hotel: this.reservation?.Hotel, //clave de hotel, obtener de reserva
          Cia: '',
          ArrivalDate: this.reservation?.Arv_date, //obtener de la reserva
          DepartureDate: this.reservation?.Depart_dt, //obtener de la reserva
          Operation: 'Payment',
          OperationDescription: null,
          Room: null,
          PalaceAuthID: null,
          EntUser: null,
          SalesOperation: null,
          Division: 'CALLCENTER',
          MSI: false,
          NumPagos: 0,
          SoloAutorizacion: false,
          IHR: false,
          PER: false,
          PCINode: null,
          ConfirmationNo: null,
          Tag: null,
          AuthInfo: null
        },
        postOnly: false,
        isMember: true,
        hotel: this.reservation?.Hotel, //obtener de la reserva
        folio: this.reservation?.Folio, //obtener de la reserva
        reservationAmount: this.reservationBalance || 0, //obtener de la reserva
        exchangeRate: 1,
        currencyCharge: this.bookingPayment?.currency, //obtener del form del paylink
        airfarePayment: null,
        groundTransportAmount: 0,
        payType: 2,
        authId: '',
        msi: 0,
        reservationsToPay: [this.reservationToPay], //pendiente a revisar dependiendo lo del dto de reservacion (regresa array de objetos de habitaciones mapeadas)
        isIHR: true,
        paymentDoneByPanamanian: false,
        isPremierReservation: false,
        eWalletMovementRequest: {},
        isWithPurse: false,
        logTermsAndCond: null,
        transactionId: 0,
        uniqueId: ''
      },
      company: this.reservation?.Extension?.Company,
      application: this.reservation?.Extension?.Application,
      isNational: this.authStore.isNational || false,
      isOnlyReservationPayment: false,
      isCodeVPC: false
    }
  }

  get authStore() {
    return new UseAuth()
  }

  get reservationToPay() {
    return {
      Hotel: this.reservation?.Hotel,
      Folio: this.reservation?.Folio,
      Rm_type: this.reservation?.Rm_type,
      AmountToPay: this.reservationBalance || 0,
      HotelName: this.properties.find(
        (item: any) => item.attributes.externalId === this.reservation.Hotel
      )?.title
    }
  }

  public get toastOptions(): ToastOptions {
    return {
      theme: 'pe_toast',
      duration: ToastDuration.FIVE_SECONDS,
      // @ts-ignore
      keepOnHover: true,
      type: 'error'
    }
  }

  public async getExChangeRate(payload: any) {
    try {
      const {data} = await this.getExChangeRateUseCase.run(payload)
      this.exchangeRate = data?.data || 0
    } catch (error) {
      this.exchangeRate = 0
    }
  }

  public async payNowService() {
    try {
      const {data}: any = await this.payNowUseCase.run(this.tcPayload)
      if (data?.data) this.tcPaymentResponse = data.data
      return true
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      return false
    }
  }

  public async getTermsAndConditions() {
    const {data} = (await this.getTermsAndConditionsUseCase.run()) || {}
    //@ts-ignore
    this.collectionTypeTerms = data?.data!
  }

  public async getNationalities() {
    const data = await this.getNationalitiesUseCase.run()
    this.nationalities = data
  }

  public async getPaymentConfirmationContent() {
    try {
      const response = await this.paymentConfirmationContent.run()

      this.confirmationContent = response
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async getProperties() {
    const data = await this.getPropertiesUseCase.run()
    //@ts-ignore
    this.properties = data?.data
  }

  public async getDataReservation(payload: PayloadDataReservation) {
    try {
      const {data} = await this.getReservationByTokenUseCase.run(payload)
      
      this.showLoadingPage = false
      // @ts-ignore
      if (this.validateReservation(data?.data._Reservation)) this.showReservationCancelled = true
      
      // @ts-ignore
      this.reservation = data?.data._Reservation
      
      // @ts-ignore
      this.reservationBalance = data?.data._Balance
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    } finally {
      this.showLoading = false
    }
  }

  public validateReservation(reservation: any): boolean {
    return reservation.Status === ReservationStatus.CANCELLED
  }

  public payNowReservation(payload: PayloadPayNowReservation) {
    return this.payNowReservationUseCase.run(payload)
  }
}

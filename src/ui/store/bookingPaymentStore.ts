import {Pinia, Store} from 'pinia-class-component'
import dayjs from 'dayjs'
import {calculateRoomImperialFee} from '../utils/arithmetic/Imperial'
import {PaymentStore} from './paymentStore'
import {WalletStore} from './benefits/walletStore'
import {BookingStore} from './bookingStore'
import {UseAuth} from './auth'
import {PropertiesStore} from './propertiesStore'
import UseCase from '~/src/app/common/application/UseCase'
import bookingPaymentTypes from '~/src/app/common/types/bookingPaymentTypes'
import {lazyInject} from '~/src/container'

// Entities
import {PECreditCard} from '~/src/app/bookingpayment/domain/entities/cardCredit'
import {CardSelected, PayDetail} from '~/src/app/bookingpayment/domain/entities/cardPayment'
import {PEPayment} from '~/src/app/bookingpayment/domain/entities/PEPayment'
import {PaidRoomData} from '~/src/app/bookingpayment/domain/entities/paidRoom'
import {PaymentStatus} from '~/src/app/bookingpayment/domain/enums/paymentStatus'
import {CardsCreditEntity} from '~/src/app/payments/domain/entities/cardsCreditEntity'
import {PayNow} from '~/src/app/bookingpayment/domain/entities/payNow'
import {ReservationInfo} from '~/src/app/booking/domain/entities/reservationInfo'
import {Currencies} from '~/src/app/bookingpayment/domain/enums/currencies'
import {
  PaymentProductId,
  ReservationsToPay
} from '~/src/app/bookingpayment/domain/dto/payNowPayloadDto'
import Exception from '~/src/app/network/common/domain/entity/Exception'
import {PayWithUniversalCreditPayloadDto} from '~/src/app/bookingpayment/domain/dto/payWithUniversalCreditPayloadDto'
import {PaymentConfirmationContentEntity} from '~/src/app/bookingpayment/domain/entities/paymentConfirmationContentEntity'
import {GetOwnersAdapter} from '~/src/app/owners/domain/adapters/getOwnersAdapter'
import {Response} from '~/src/app/network/common/domain/entity/response'
import {PayNowResponseDto} from '~/src/app/bookingpayment/domain/dto/payNowReponseDto'
import {PayWithUniversalCreditResponseDto} from '~/src/app/bookingpayment/domain/dto/payWithUniversalCreditResponseDto'
import {ReservationFromBookings} from '~/src/app/booking/domain/entities/reservationFromBookings'
import {PaymentMethod} from '~/src/app/bookingpayment/domain/enums/paymentMethod'
import {selectedNights} from '~/src/app/calendar/domain/generator/CalendarDataGenerator'
import {
  getPaidRoomsFromReservationInfo,
  getRoomsFromReservationInfo,
  getTotalAmountRooms,
  getTotalAmountServices,
  getTotalGuestsFromReservationInfo
} from '~/src/app/gtm/domain/mapper/roomMapper'
import {PurchaseDataLayer} from '~/src/app/gtm/domain/types/PurchaseDataLayer'
import { BookingStatus } from '~/src/app/bookings/domain/enums/bookingStatus'

@Store({
  name: 'bookingPaymentStore'
})
export class BookingPaymentStore extends Pinia {
  // State
  @lazyInject(bookingPaymentTypes.payNowUseCase)
  private readonly payNow!: UseCase<any, any>

  @lazyInject(bookingPaymentTypes.payWithUniversalCreditsCase)
  private readonly payWithUniversalCredits!: UseCase<any, any>

  @lazyInject(bookingPaymentTypes.paymentConfirmationContentUsecase)
  private readonly paymentConfirmationContent!: UseCase<any, any>

  private payments: PEPayment[] = []
  private paidPayments: PaidRoomData[] = []
  private creditCards: PECreditCard[] = []
  private tcPaymentResponse: PayNowResponseDto['data'] = null
  private ucPaymentResponse: PayWithUniversalCreditResponseDto['data'] = null
  private payNowData: PayNow | null = null
  private idProfile: string | null = null
  private isOnePay: boolean = true
  public isLoading: boolean = true
  public confirmationContent: PaymentConfirmationContentEntity | null = null

  // Getters

  get walletStore() {
    return new WalletStore()
  }

  get bookingStore() {
    return new BookingStore()
  }

  get paymentStore() {
    return new PaymentStore()
  }

  get propertiesStore() {
    return new PropertiesStore()
  }

  get authStore() {
    return new UseAuth()
  }

  // Consumers

  get getPayments() {
    return this.payments
  }

  get readPaidPayments() {
    return this.paidPayments
  }

  get getCurrentPayment() {
    return this.payments[0] || null
  }

  get getPurseId() {
    return this.walletStore?.summarysCards?.account || ''
  }

  get getUniversalCredits(): number {
    return this.walletStore.summarysCards?.amountAvailable ?? 0
  }

  get readCreditCards() {
    return this.creditCards
  }

  get creditCardToPay(): CardSelected | null {
    return this.payNowData?.payload?.cardSelected || null
  }

  get totalCost() {
    return this.isFromBookings
      ? this.roomFromBookings.reduce((sum, current) => sum + current.balance, 0) || 0
      : this.getPayments.reduce((sum, current) => sum + current.remaningBalance, 0) || 0
  }

  get bookingInfo() {
    return this.bookingStore.reservationInfo
  }

  get bookingRoomInfo() {
    return this.bookingInfo.find(room => room.index === this.payNowData?.roomIndex)
  }

  get toPayRoom() {
    return this.payments.find(room => room.roomIndex === this.payNowData?.roomIndex)
  }

  get bookingFolio() {
    return this.isOnePay ? this.getCurrentPayment?.folio : this.toPayRoom?.folio || null
  }

  // Validations

  get isMultiPay() {
    return !!(this.amountTotalCC && this.amountTotalUC)
  }

  get isValidResponse() {
    return this.isMultiPay
      ? !!this.ucPaymentResponse?.Reservations && !!this.tcPaymentResponse?.Reservations
      : !!this.ucPaymentResponse?.Reservations || !!this.tcPaymentResponse?.Reservations
  }

  get isFromBookings() {
    return this.roomFromBookings.length > 0
  }

  // CC

  get payPayloadCC() {
    return {
      request: {
        paymentRequest: {
          IsSaveTsCreditPreferential: !!this.creditCardToPay?.id,
          Company: this.authStore.userCompany || 0,
          Application: this.authStore.applicationUserMember || '',
          IsNational: this.authStore.isNational || false,
          _type: 0,
          _response: null,
          Response: null,
          Type: 0,
          TypeText: '',
          paymentRequest: {
            ccField: {
              firstNameField: this.creditCardToPay?.firstName || '',
              middleNameField: '',
              lastNameField: '',
              lastName2Field: '',
              emailField: '',
              phoneField: '',
              amountField: 0,
              currencyField: 'USD',
              payment_typeField: 'SinglePayment',
              monthsInterestFreeField: 0,
              numberField: this.creditCardToPay?.number ?? '',
              securityCodeField: this.creditCardToPay?.securityCode ?? '',
              expMMField: this.creditCardToPay?.expMM ?? '',
              expYYField: this.creditCardToPay?.expYY ?? '',
              addressField: this.creditCardToPay?.address ?? '',
              zipCodeField: this.creditCardToPay?.zipcode ?? '',
              stateField: this.creditCardToPay?.state ?? '',
              state_MEXField: 0,
              state_USAField: 0,
              state_CANField: 0,
              cityField: this.creditCardToPay?.city ?? '',
              countryField: '',
              country_ISO3Field: this.creditCardToPay?.country ?? 'USA',
              languageField: '',
              districtField: '',
              municipalityField: '',
              cardTypeField: this.getTypeField
            },
            bankField: '',
            respetarBancoField: false,
            palaceReferenceField: '',
            palaceUniqueIDField: '',
            testModeField: false,
            validaAVSField: false,
            hotelField: '',
            ciaField: '',
            arrivalDateField: this.checkIn,
            departureDateField: this.checkOut,
            operationField: 'Payment',
            operationDescriptionField: '',
            roomField: '',
            palaceAuthIDField: '',
            entUserField: '',
            salesOperationField: '',
            divisionField: 'CALLCENTER',
            mSIField: false,
            numPagosField: 0,
            soloAutorizacionField: false,
            iHRField: this.authStore.user!._UserMember._isIHR,
            pERField: false,
            pCINodeField: '',
            confirmationNoField: '',
            tagField: '',
            authInfoField: ''
          },
          CC: {
            firstNameField: this.creditCardToPay?.firstName ?? '',
            middleNameField: '',
            lastNameField: '',
            lastName2Field: '',
            emailField: '',
            phoneField: '',
            amountField: 0,
            currencyField: 'USD',
            payment_typeField: 'SinglePayment',
            monthsInterestFreeField: 0,
            numberField: this.creditCardToPay?.number ?? '',
            securityCodeField: this.creditCardToPay?.securityCode ?? '',
            expMMField: this.creditCardToPay?.expMM ?? '',
            expYYField: this.creditCardToPay?.expYY ?? '',
            addressField: this.creditCardToPay?.address ?? '',
            zipCodeField: this.creditCardToPay?.zipcode ?? '',
            stateField: this.creditCardToPay?.state ?? '',
            state_MEXField: 0,
            state_USAField: 0,
            state_CANField: 0,
            cityField: this.creditCardToPay?.city ?? '',
            countryField: '',
            country_ISO3Field: this.creditCardToPay?.country ?? 'USA',
            languageField: '',
            districtField: '',
            municipalityField: '',
            cardTypeField: this.getTypeField
          },
          Bank: '',
          RespetarBanco: false,
          PalaceReference: '',
          PalaceUniqueID: '',
          testMode: false,
          ValidaAVS: false,
          Hotel: this.Hotel,
          Cia: '',
          ArrivalDate: this.checkIn,
          DepartureDate: this.checkOut,
          Operation: 'Payment',
          OperationDescription: '',
          Room: '',
          PalaceAuthID: '',
          EntUser: '',
          SalesOperation: '',
          Division: 'CALLCENTER',
          MSI: false,
          NumPagos: 0,
          SoloAutorizacion: false,
          IHR: this.authStore.user!._UserMember._isIHR,
          PER: false,
          PCINode: '',
          ConfirmationNo: '',
          Tag: '',
          AuthInfo: ''
        },
        postOnly: false,
        isMember: true,
        hotel: this.Hotel,
        folio: this.bookingFolio || 0,
        reservationAmount: this.amountTotalCC,
        exchangeRate: 1,
        currencyCharge: 'USD',
        airfarePayment: null,
        groundTransportAmount: 0,
        payType: 2,
        authId: '',
        msi: 0,
        reservationsToPay: this.reservationsToPayCC,
        isIHR: this.authStore.user!._UserMember._isIHR,
        paymentDoneByPanamanian: false,
        isPremierReservation: false,
        eWalletMovementRequest: {},
        isWithPurse: false,
        logTermsAndCond: null,
        transactionId: 0,
        uniqueId: '',
        creditcardId: this.creditCardToPay?.id ? Number(this.creditCardToPay?.id) : 0
      },
      application: this.authStore.applicationUserMember || '',
      company: this.authStore.userCompany || 0,
      isNational: this.authStore.isNational || false,
      isOnlyReservationPayment: false,
      isCodeVPC: false
    }
  }

  get roomFromBookings() {
    return this.bookingStore.reservationFromBookings
  }

  get reservationsToPayCC() {
    const reservations: ReservationsToPay[] = []
    if (this.isOnePay)
      this.payments.forEach(reservation =>
        reservations.push({
          Hotel: this.Hotel,
          Folio: reservation?.folio || 0,
          Rm_type: reservation.room.roomType || '',
          AmountToPay: this.calculateAmount(PaymentMethod.CC, reservation.remaningBalance),
          HotelName:
            this.propertiesStore.propertiesFilteredByMembership?.find(
              item => item.externalId === this.bookingStore.getbookingpropertyCode
            )?.text || ''
        })
      )
    else if (this.toPayRoom)
      reservations.push({
        Hotel: this.Hotel,
        Folio: this.toPayRoom?.folio || 0,
        Rm_type: this.toPayRoom.room.roomType || '',
        AmountToPay: this.calculateAmount(PaymentMethod.CC),
        HotelName:
          this.propertiesStore.propertiesFilteredByMembership?.find(
            item => item.externalId === this.Hotel
          )?.text || ''
      })

    return reservations
  }

  get amountTotalCC() {
    return this.payNowData?.payload?.amountCreditCard || 0
  }

  get checkIn() {
    return this.isFromBookings
      ? this.roomFromBookings[0].checkIn
      : this.bookingStore.getBooking.checkIn
  }

  get checkOut() {
    return this.isFromBookings
      ? this.roomFromBookings[0].checkOut
      : this.bookingStore.getBooking.checkOut
  }

  get Hotel() {
    return this.isFromBookings
      ? this.roomFromBookings[0].Hotel
      : this.bookingStore.getbookingpropertyCode
  }

  // UC

  get payPayloadUC(): PayWithUniversalCreditPayloadDto | null {
    return {
      paymentRequest: {
        IsSaveTsCreditPreferential: !!this.creditCardToPay?.id,
        Company: this.authStore.userCompany || 0,
        Application: this.authStore.applicationUserMember || '',
        IsNational: this.authStore.isNational || false,
        _type: 0,
        _response: null,
        Response: null,
        Type: 0,
        TypeText: '',
        paymentRequest: {
          ccField: {
            firstNameField: this.creditCardToPay?.firstName || '',
            middleNameField: '',
            lastNameField: '',
            lastName2Field: '',
            emailField: '',
            phoneField: '',
            amountField: 0,
            currencyField: 'USD',
            payment_typeField: 'SinglePayment',
            monthsInterestFreeField: 0,
            numberField: this.creditCardToPay?.number || '',
            securityCodeField: this.creditCardToPay?.securityCode || '',
            expMMField: this.creditCardToPay?.expMM || '',
            expYYField: this.creditCardToPay?.expYY || '',
            addressField: '',
            zipCodeField: '',
            stateField: '',
            state_MEXField: 0,
            state_USAField: 0,
            state_CANField: 0,
            cityField: '',
            countryField: '',
            country_ISO3Field: 840,
            languageField: '',
            districtField: '',
            municipalityField: '',
            cardTypeField: this.getTypeField
          },
          bankField: '',
          respetarBancoField: false,
          palaceReferenceField: '',
          palaceUniqueIDField: '',
          testModeField: false,
          validaAVSField: false,
          hotelField: '',
          ciaField: '',
          arrivalDateField: this.bookingStore.getBooking.checkIn,
          departureDateField: this.bookingStore.getBooking.checkOut,
          operationField: 'Payment',
          operationDescriptionField: '',
          roomField: '',
          palaceAuthIDField: '',
          entUserField: '',
          salesOperationField: '',
          divisionField: 'CALLCENTER',
          mSIField: false,
          numPagosField: 0,
          soloAutorizacionField: false,
          iHRField: this.authStore.user!._UserMember._isIHR,
          pERField: false,
          pCINodeField: '',
          confirmationNoField: '',
          tagField: '',
          authInfoField: {
            ent_UserField: '',
            ent_PassField: '',
            ent_TermField: ''
          }
        },
        CC: {
          firstNameField: this.creditCardToPay?.firstName || '',
          middleNameField: '',
          lastNameField: '',
          lastName2Field: '',
          emailField: '',
          phoneField: '',
          amountField: 0,
          currencyField: 'USD',
          payment_typeField: 'SinglePayment',
          monthsInterestFreeField: 0,
          numberField: this.creditCardToPay?.number || '',
          securityCodeField: this.creditCardToPay?.securityCode || '',
          expMMField: this.creditCardToPay?.expMM || '',
          expYYField: this.creditCardToPay?.expYY || '',
          addressField: '',
          zipCodeField: '',
          stateField: '',
          state_MEXField: 0,
          state_USAField: 0,
          state_CANField: 0,
          cityField: '',
          countryField: '',
          country_ISO3Field: 840,
          languageField: '',
          districtField: '',
          municipalityField: '',
          cardTypeField: this.getTypeField
        },
        Bank: '',
        RespetarBanco: false,
        PalaceReference: '',
        PalaceUniqueID: '',
        testMode: false,
        ValidaAVS: false,
        Hotel: this.Hotel,
        Cia: '',
        ArrivalDate: this.bookingStore.getBooking.checkIn,
        DepartureDate: this.bookingStore.getBooking.checkOut,
        Operation: 'Payment',
        OperationDescription: '',
        Room: '',
        PalaceAuthID: '',
        EntUser: '',
        SalesOperation: '',
        Division: 'CALLCENTER',
        MSI: false,
        NumPagos: 0,
        SoloAutorizacion: false,
        IHR: this.authStore.user!._UserMember._isIHR,
        PER: false,
        PCINode: '',
        ConfirmationNo: '',
        Tag: '',
        AuthInfo: {
          ent_UserField: '',
          ent_PassField: '',
          ent_TermField: ''
        }
      },
      postOnly: false,
      isMember: true,
      hotel: '',
      folio: 0,
      reservationAmount: this.amountTotalUC,
      exchangeRate: 1,
      currencyCharge: 'USD',
      groundTransportAmount: 0,
      reservationsToPay: this.reservationsToPayUC,
      isPremierReservation: false,
      eWalletMovementRequest: this.walletMovement,
      isWithPurse: true,
      transactionId: 0,
      uniqueId: '',
      application: this.authStore.applicationUserMember || '',
      company: this.authStore.userCompany || 0,
      isNational: this.authStore.isNational || false,
      account: 0,
      merchantCode: '',
      postOnlyMovement: false
    }
  }

  get reservationsToPayUC() {
    const reservations: ReservationsToPay[] = []
    if (this.isOnePay)
      this.payments.forEach(reservation =>
        reservations.push({
          Hotel: this.Hotel,
          Folio: reservation?.folio || 0,
          Rm_type: reservation.room.roomType || '',
          AmountToPay: this.calculateAmount(PaymentMethod.UC, reservation.remaningBalance),
          HotelName:
            this.propertiesStore.propertiesFilteredByMembership?.find(
              item => item.externalId === this.bookingStore.getbookingpropertyCode
            )?.text || ''
        })
      )
    else if (this.toPayRoom)
      reservations.push({
        Hotel: this.Hotel,
        Folio: this.toPayRoom?.folio || 0,
        Rm_type: this.toPayRoom.room.roomType || '',
        AmountToPay: this.calculateAmount(PaymentMethod.UC),
        HotelName:
          this.propertiesStore.propertiesFilteredByMembership?.find(
            item => item.externalId === this.Hotel
          )?.text || ''
      })

    return reservations
  }

  get walletMovement() {
    return {
      Application: this.authStore.applicationUserMember || '',
      Hotel: this.Hotel,
      HotelOpera: '',
      IdProducto: PaymentProductId.UC,
      Idcuenta: this.getPurseId,
      Idprofile: this.idProfile || '',
      Idptovta: 0,
      Movementtype: 'C',
      Movementvalue: 0
    }
  }

  get amountTotalUC() {
    return this.payNowData?.payload?.amountUniversalCredits || 0
  }

  // Mutations

  public calculateAmount(type: PaymentMethod, roomBalance: number = -1) {
    const proportional = roomBalance / this.totalCost
    if (proportional <= 0)
      return type === PaymentMethod.CC ? this.amountTotalCC : this.amountTotalUC
    return type === PaymentMethod.CC
      ? proportional * this.amountTotalCC
      : proportional * this.amountTotalUC
  }

  public resetPayments() {
    this.payments = []
    this.paidPayments = []
  }

  public pushPaidPayment(payment: PaidRoomData) {
    this.paidPayments?.push(payment)
  }

  public mapPaidPayment(payment: PEPayment | null, payload: PayDetail): PaidRoomData[] {
    if (payment)
      return [
        {
          ...payment,
          ...payload,
          remaningBalance: 0,
          status: PaymentStatus.Paid
        }
      ]
    else
      return this.getPayments.map(p => ({
        ...p,
        ...payload,
        remaningBalance: 0,
        status: PaymentStatus.Paid
      }))
  }

  public mapBookings(rooms: ReservationInfo[] | ReservationFromBookings[]) {
    this.resetPayments()

    rooms.forEach((room: ReservationFromBookings | ReservationInfo) => {

      if (
        room.status !== PaymentStatus.Paid && 
        room.status !== BookingStatus.PAID && 
        room.folio > 0
      ) {

        const benefitsRate =
          room.benefits?.reduce((sum, current) => sum + current.totalPrice, 0) || 0

        const fees = calculateRoomImperialFee(room as ReservationInfo)

        const depositCalculated =
          (room.roomSelected?.selectedOption?.rate || 0) + (benefitsRate || 0) + fees

        const remaningBalance = room.reservationFolioData?.Deposit || depositCalculated

        if (remaningBalance === 0) {
          room.status = PaymentStatus.Paid
          return;
        }

        const payment: PEPayment = {
          remaningBalance: remaningBalance,
          room: {
            guest: room?.guests[0]?.name,
            alias: '',
            property: room.roomSelected?.selectedCategory.title.toString() || '',
            roomNumber: room.roomSelected?.selectedCategory?.recnum.toString() || '',
            roomType: room.roomSelected?.selectedCategory.RealCode || ''
          },
          status: room.status,
          roomIndex: room.index,
          currency: Currencies.USD,
          folio: room.folio || 0
        }

        this.payments.push(payment)
      }
    })
  }

  // Actions
  async fetchCreditCards(membership: string, isNational: boolean = false) {
    await this.paymentStore.getCardsCredit(membership, isNational)

    this.creditCards = this.paymentStore.cardsCredit.map((card: CardsCreditEntity) => {
      return {
        cardId: Number(card?.id || '0') || 0,
        cardNumber: card.cardTermination || '',
        cardHolderName: card.cardHolder || '',
        expiryDate: card.dueDate || '',
        cardStamp: card.cardStamp || ''
      }
    })
  }

  public async pay({roomIndex, payload}: PayNow) {
    this.payNowData = {roomIndex, payload}

    if (roomIndex > -1 && this.toPayRoom) this.isOnePay = false

    if (payload.amountCreditCard > 0) await this.payNowService()
    if (payload.amountUniversalCredits > 0) {
      await this.fetchIdProfile()
      await this.payWithUniversalCreditService()
    }

    if (this.isValidResponse) {
      const formatedPaids = this.mapPaidPayment(this.toPayRoom || null, payload)

      this.paidPayments = [...this.paidPayments, ...formatedPaids]

      const purchaseEventArray: PurchaseDataLayer[] = []

      this.paidPayments.forEach((room, index) => {
        if (!this.isFromBookings)
          this.bookingStore.updateReservationStatus(room.roomIndex, PaymentStatus.Paid)

        if (this.tcPaymentResponse?.Reservations.length === 0 && !this.isFromBookings)
          this.bookingStore.updateReservationStatus(room.roomIndex, PaymentStatus.OnProcess)
        
        if (this.tcPaymentResponse?.Reservations.length === 0 && this.isFromBookings)
          this.bookingStore.updateReservationFromBookingStatus(room.roomIndex, BookingStatus.ON_PROCESS)

        this.payments = this.payments.filter(r => r.roomIndex !== room.roomIndex)

        const {folio, currency} = formatedPaids[index]

        const hotelName = this.bookingStore.getBooking.propertyCode
        const checkIn = this.bookingStore.getBooking.checkIn
        const checkOut = this.bookingStore.getBooking.checkOut
        const nights = selectedNights(dayjs(checkIn).toDate(), dayjs(checkOut).toDate())
        const numberOfRooms = this.bookingStore.getBooking.rooms.length
        const {numberOfAdults, numberOfChildren, numberOfGuests} =
          getTotalGuestsFromReservationInfo(this.bookingStore.reservationInfo)
        const rooms = getPaidRoomsFromReservationInfo(this.bookingStore.reservationInfo, hotelName)
        const totalRooms = getTotalAmountRooms(this.bookingStore.reservationInfo)
        const totalServices = getTotalAmountServices(this.bookingStore.reservationInfo)
        const revenueFormatted = Number(Number(payload.remaningBalance).toFixed(2) || 0);

        const purchaseEvent: PurchaseDataLayer = {
          event: 'purchase',
          hotelName,
          checkIn,
          checkOut,
          numberOfRooms,
          numberOfGuests,
          numberOfAdults,
          numberOfChildren,
          currencyCode: String(currency),
          nights,
          totalRooms,
          totalServices,
          reservID: hotelName + '-' + String(folio),
          revenue: revenueFormatted === 0 ? 1 : revenueFormatted,
          rooms
        }

        purchaseEventArray.push(purchaseEvent)
      })

      // @ts-ignore
      this.$nuxt.$gtm.push(purchaseEventArray[0])
    }

    if (payload.amountUniversalCredits > 0)
      await this.walletStore.getSummarys(this.authStore.userAffiliationId || '')
  }

  get getTypeField(): string {
    switch(this.creditCardToPay?.cardType) {
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

  public async payNowService() {
    try {
      const {data}: Response<PayNowResponseDto> = await this.payNow.run(this.payPayloadCC)
      if (data?.data) this.tcPaymentResponse = data.data
    } catch (e: any) {
      console.error(e)
      // @ts-ignore
      this.tcPaymentResponse = {
        Reservations: []
      }
    }
  }

  public async payWithUniversalCreditService() {
    try {
      const {data}: Response<PayWithUniversalCreditResponseDto> =
        await this.payWithUniversalCredits.run(this.payPayloadUC)
      if (data?.data) this.ucPaymentResponse = data.data
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async getPaymentConfirmationContent() {
    try {
      const response = await this.paymentConfirmationContent.run(null)
      this.confirmationContent = response
    } catch (e: any) {
      const error = new Exception(0, [e.message], [])
      console.error(error)
    }
  }

  public async fetchIdProfile() {
    const getOwnersAdapter = new GetOwnersAdapter()
    const response = await getOwnersAdapter.getOwners()
    if (response)
      this.idProfile =
        getOwnersAdapter.store.readOwners.find(
          owner => owner.MemberProfilesRelateds.email === this.authStore.email
        )?.MemberProfilesRelateds.idprofileopera || ''
  }
}

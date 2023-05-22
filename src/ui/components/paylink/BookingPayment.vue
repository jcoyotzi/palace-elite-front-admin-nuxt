<template>
  <div class="pe-relative pe-divider-2 pe-w-[90%] lg:!pe-w-[400px] pe-divider-black-medium pe-text-white">
    <div
      class="pe-bg-black-medium pe-text-center pe-rounded-t-[5px] pe-font-serif pe-text-[24px] pe-uppercase py-[20px]">
      {{ $t('bookingPayment') }}
    </div>
    <ValidationObserver v-slot="{ invalid }" tag="div"
      class="pe-bg-black-light pe-text-white pe-font-sans pe-text-[16px] pe-rounded-b-[5px] pe-px-[35px] pe-py-[40px]">
      <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full"
        :class="getClassResidenceValidator">
        <PESelect v-model="bookingPayment.nationalitie" :label="$t('reservationsHolder')" :items="nationalities"
          :disabled="showLoadingPayNow" use-input />
        <div class="w-full pt-2 text-red-600">
          <span v-for="(error, i) in errors" :key="i">
            {{ error }}
          </span>
        </div>
      </ValidationProvider>

      <div v-if="canAddDataCard">
        <ValidationProvider v-slot="{ errors }" ref="holderValidator" rules="required" tag="div"
          class="pe-mb-7 pe-w-full">
          <PETextInput :label="$t('cardHolderName')" :disabled="showLoadingPayNow"
            v-model="bookingPayment.holderName" />
          <div class="w-full pt-2 text-red-600">
            <span v-for="(error, i) in errors" :key="i">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" ref="numberValidator" rules="required" tag="div"
          class="pe-mb-7 pe-w-full">
          <PEInput v-model="creditCardNumber" @change="onChangeTypeCard" :label="$t('cardNumber')" :disabled="showLoadingPayNow"
            :mask="currentMaskNumber" @blur="onCardFocusBlur(false)"
                      @focus="onCardFocusBlur(true)">
            <template #append-inner>
              <PEIcon v-if="cardStampChange" class="pe-mr-[10px]" :size="35">{{ cardStamp }}</PEIcon>
            </template>
          </PEInput>
          <div class="w-full pt-2 text-red-600">
            <span v-for="(error, i) in errors" :key="i">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" ref="expirationValidator" rules="required|dateValidate" tag="div"
          class="pe-mb-7 pe-w-full">
          <PEInput v-model="bookingPayment.expiration" :label="$t('cardExpiration')" :disabled="showLoadingPayNow"
            :mask="'##/##'" />
          <div class="w-full pt-2 text-red-600">
            <span v-for="(error, i) in errors" :key="i">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" ref="codeValidator" rules="required" tag="div"
          class="pe-mb-7 pe-w-full">
          <PEInput v-model="bookingPayment.securityCode" label="CVV" :mask="getMaskCVV" :disabled="showLoadingPayNow">
            <template #append-inner>
              <PEIcon class="pe-mr-3 pe-fill-transparent pe-text-white" color="medium">card-credit</PEIcon>
            </template>
          </PEInput>
          <div class="w-full pt-2 text-red-600">
            <span v-for="(error, i) in errors" :key="i">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
          <PESelect v-model="bookingPayment.currency" :label="$t('currency')" :disabled="showLoadingPayNow"
            :items="currencys" />
          <div class="w-full pt-2 text-red-600">
            <span v-for="(error, i) in errors" :key="i">
              {{ error }}
            </span>
          </div>
        </ValidationProvider>
        <template v-if="amexActive">
          <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
            <PESelect v-model="bookingPayment.country" :label="$t('country')" :disabled="showLoadingPayNow"
              :items="countriesList" @input="handleStates" />
            <div class="w-full pt-2 text-red-600">
              <span v-for="(error, i) in errors" :key="i">
                {{ error }}
              </span>
            </div>
          </ValidationProvider>
          <template v-if="hasStateItems">
            <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
              <PESelect v-model="bookingPayment.state" :items="statesList" :label="$t('state')"
                :disabled="showLoadingPayNow" />
              <div class="w-full pt-2 text-red-600">
                <span v-for="(error, i) in errors" :key="i">
                  {{ error }}
                </span>
              </div>
            </ValidationProvider>
          </template>
          <template v-else>
            <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
              <PETextInput v-model="stateCustom" :label="$t('state')" :disabled="showLoadingPayNow" @onchange="onChangeStateCustom"/>
              <div class="w-full pt-2 text-red-600">
                <span v-for="(error, i) in errors" :key="i">
                  {{ error }}
                </span>
              </div>
            </ValidationProvider>
          </template>
          <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
            <PETextInput v-model="bookingPayment.city" :label="$t('city')" :disabled="showLoadingPayNow" />
            <div class="w-full pt-2 text-red-600">
              <span v-for="(error, i) in errors" :key="i">
                {{ error }}
              </span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
            <PETextInput v-model="bookingPayment.address" :label="$t('address')" :disabled="showLoadingPayNow" />
            <div class="w-full pt-2 text-red-600">
              <span v-for="(error, i) in errors" :key="i">
                {{ error }}
              </span>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required" tag="div" class="pe-mb-7 pe-w-full">
            <PETextInput v-model="bookingPayment.zip" :label="$t('zip')" :disabled="showLoadingPayNow" />
            <div class="w-full pt-2 text-red-600">
              <span v-for="(error, i) in errors" :key="i">
                {{ error }}
              </span>
            </div>
          </ValidationProvider>
        </template>

        <div v-if="divisa === 'MXN'" class="pe-justify-between pe-mt-4 pe-flex">
          <div class="pe-justify-start"> {{ $t('exchangeRate') }} </div>
          <div class="pe-justify-end"> {{ exchangeRate }} </div>
        </div>
        <div class="pe-justify-between pe-flex pe-mt-2">
          <div class="pe-justify-start"> {{ $t('total') }} </div>
          <div class="pe-justify-end"> {{ total }} </div>
        </div>

        <div class="pe-mt-10">
          {{ $t('termsAndConditionsText') }}
          <span class="pe-text-blue-light pe-underline pe-cursor-pointer" @click.prevent="openModalBookingConditions">
            {{ $t('bookingConditions') }} </span>,
          <span class="pe-text-blue-light pe-underline pe-cursor-pointer" @click.prevent="openModalTermsAndConditions">
            {{ $t('termsAndConditions') }}
          </span>
          {{ $t('andThe') }}
          <span class="pe-text-blue-light pe-underline pe-cursor-pointer" @click.prevent="openModalPrivacyNoticies">
            {{ $t('privacyNotices') }} </span>.
        </div>
        <div class="pe-text-center">
          <PEButton class="pe-w-[80%] pe-mt-[30px]" flat solid uppercase :disabled="invalid"
            :loading="showLoadingPayNow" @click.prevent="payNow">
            {{ $t('payNow') }}
          </PEButton>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { VueMaskFilter } from 'v-mask'
import { NationalitiesDto } from '~/src/app/paylink/domain/entities/nationalities'
import BookingPaymentForm from '~/src/app/paylink/domain/entities/bookingPaymentForm'
import { PayLinkStore } from '~/src/ui/store/payLinkStore'
import { required } from 'vee-validate/dist/rules'
import i18n from '~/src/ui/i18n/paylink.lang'
import CurrencyFormatDivisa from '../../mixins/CurrencyFormatDivisa'
import PayloadPayNowReservation from '~/src/app/paylink/domain/entities/payloadPayNowReservation'
import { LayoutStore } from '../../store/layoutStore'
import { PaymentStore } from '../../store/paymentStore'
import { BookingPaymentStore } from '../../store/bookingPaymentStore'
import { TypesCards } from '~/src/app/payments/domain/enum/typesCards'
import { Countries } from '~/src/app/bookingpayment/domain/enums/countries'
import { CanadaStates, MexicoStates, UsaStates } from '~/src/app/bookingpayment/domain/enums/states'

@Component({
  i18n,
  filters: {
    VMask: VueMaskFilter
  },
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class BookingPayment extends Mixins(CurrencyFormatDivisa) {
  public divisa = 'USD'

  public creditCardNumber = ''

  public getMaskCVV: string = ''

  public cardStamp: string = ''

  public cardStampChange: boolean = false

  public states: string = 'UsaStates'

  public stateCustom: string = ''

  public isVisibleNumber: boolean = false

  async beforeMount() {
    this.setFormConfiguration()

    await this.paylinkStore.getPaymentConfirmationContent()
  }

  public setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: this.$t('required') as string
    })

    extend('dateValidate', {
      validate(value: string) {
        const date = new Date()

        const currentMonth = date.getMonth() + 1
        const currentYear = Number(date.getFullYear().toString().slice(2, 4))

        const dateInput = value.split('/')

        const month = Number(dateInput[0])
        const year = Number(dateInput[1])

        if (month > 12 || month <= 0) {
          return false
        } else if (year < currentYear) {
          return false
        } else if (year === currentYear) {
          if (month < currentMonth) {
            return false //
          }
        }

        return true
      },
      message: this.$t('expirationNotValid') as string,
      computesRequired: true
    })
  }

  get responsePayNow() {
    return this.paylinkStore.tcPaymentResponse
  }

  get currentMaskNumber(): string { 
    if (!this.isVisibleNumber) {
      if ([TypesCards.VISA, TypesCards.MC].includes(this.cardStamp as TypesCards)) return '#### #### #### ####'
      if (this.cardStamp ===  TypesCards.AMEX) return '#### ###### #####'
      if (this.cardStamp ===  TypesCards.DINERS) return '#### ###### ####'
    }
    return ''
  }

  public onCardFocusBlur(value: boolean) {
    this.isVisibleNumber = value
  }

  public async payNow() {
    this.showLoadingPayNow = true
    try {
      await this.paylinkStore.payNowService()

      if (this.responsePayNow.Reservations !== null) {
        this.$toasted.success(this.$t('messageSuccess') as string, this.paylinkStore.toastOptions)
        this.paylinkStore.reservationSuccessPaid = true
      } else
        this.$toasted.error(
          this.$t('messagePaymentError') as string,
          this.paylinkStore.toastOptions
        )
    } catch (error) {
      this.$toasted.error(this.$t('messagePaymentError') as string, this.paylinkStore.toastOptions)
    } finally {
      this.showLoadingPayNow = false
    }
  }

  public openModalBookingConditions() {
    this.paylinkStore.showModalBookingConditions = true
  }

  public openModalTermsAndConditions() {
    this.paylinkStore.showModalTermsAndConditions = true
  }

  public openModalPrivacyNoticies() {
    this.paylinkStore.showModalPrivacyNoticies = true
  }

  get numberCard() {
    return this.bookingPayment.number
  }

  set numberCard(value: string) {
    this.bookingPayment.number = value.replace(' ', '')
  }

  get payloadPayNowReservation(): PayloadPayNowReservation {
    return {
      ...this.bookingPayment,
      nationalitie: this.bookingPayment.nationalitie.value
    }
  }

  get exchangeRate(): number {
    return this.paylinkStore.exchangeRate
  }

  get paymentStore(): PaymentStore {
    return new PaymentStore()
  }

  get bookingPaymentStore(): BookingPaymentStore {
    return new BookingPaymentStore()
  }

  get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  get showLoadingPayNow(): boolean {
    return this.paylinkStore.showLoadingPayNow
  }

  set showLoadingPayNow(value: boolean) {
    this.paylinkStore.showLoadingPayNow = value
  }

  get reservation() {
    return this.paylinkStore.reservation!
  }

  get collectionTypeTerms() {
    return this.paylinkStore.collectionTypeTerms
  }

  get reservationBalance() {
    return this.paylinkStore.reservationBalance
  }

  get total(): string {
    let value: any = String(this.reservationBalance)

    if (this.bookingPayment.currency !== '') this.divisa = this.bookingPayment.currency

    if (this.divisa === 'MXN') value = (value * this.exchangeRate).toFixed(2)

    return this.currencyFormatDivisa({
      value: String(value),
      prefix: '$',
      currencyText: '',
      divisa: this.divisa
    })
  }

  get currencys(): string[] {
    return ['USD', 'MXN']
  }

  get getClassResidenceValidator() {
    return {
      '!pe-mb-0': !this.canAddDataCard
    }
  }

  get nationalities(): NationalitiesDto[] {
    return this.paylinkStore.nationalities
  }

  get canAddDataCard(): boolean {
    return this.bookingPayment.nationalitie.value !== ''
  }

  get bookingPayment(): BookingPaymentForm {
    return this.paylinkStore.bookingPayment
  }

  set bookingPayment(value) {
    this.paylinkStore.bookingPayment = value
  }

  get paylinkStore(): PayLinkStore {
    return new PayLinkStore()
  }

  get amexActive() {
    return this.cardStamp === TypesCards.AMEX
  }

  public get countriesList() {
    const keys = Object.keys(Countries)
    return keys.map((item: string) => {
      return {
        // @ts-ignore
        text: Countries[item],
        value: item
      }
    })
  }

  public get statesList() {
    if (this.states === 'MexicoStates') {
      const keys = Object.keys(MexicoStates)
      return keys.map((item: string) => {
        return {
          // @ts-ignore
          text: MexicoStates[item],
          value: item
        }
      })
    }
    if (this.states === 'UsaStates') {
      const keys = Object.keys(UsaStates)
      return keys.map((item: string) => {
        return {
          // @ts-ignore
          text: UsaStates[item],
          value: item
        }
      })
    }
    if (this.states === 'CandaStates') {
      const keys = Object.keys(CanadaStates)
      return keys.map((item: string) => {
        return {
          // @ts-ignore
          text: CanadaStates[item],
          value: item
        }
      })
    }
    return []
  }

  handleStates(value: any) {
    const options: { [key: string]: string } = {
      MEX: 'MexicoStates',
      USA: 'UsaStates',
      CAN: 'CandaStates'
    }
    this.bookingPayment.state = { text: '', value: '' }
    this.states = options[value.value]
  }

  get hasStateItems(): boolean {
    return this.statesList.length > 0
  }

  public clearForm() {
    Object.assign(this.bookingPayment, {
      expiration: '',
      securityCode: '',
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
      },
    })
  }

  onChangeTypeCard(newval: any) {
    console.log()
    const value = newval.target.value.replaceAll(' ', '')
    const cardStamp = this.paymentStore.verifyTypeCard(value)
    console.log({ cardStamp, value })
    this.cardStamp = cardStamp

    this.cardStampChange = false

    this.bookingPayment.cardStamp = cardStamp
    this.bookingPayment.number = value

    this.clearForm()

    this.$nextTick(() => {
      this.getMaskCVV = cardStamp === TypesCards.AMEX ? '####' : '###'
      this.cardStampChange = true
    })
  }
}
</script>

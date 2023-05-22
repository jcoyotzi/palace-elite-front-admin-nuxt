<template>
  <section>
    <div
      :class="classes"
      class="pe-flex pe-flex-col xl:pe-flex-row pe-gap-x-[36px]"
    >
      <div
        class="pe-basis-full"

      >
        <PEPayWithMyCards
          v-if="hasCards"
          :cards="cards"
          :disabled="disabledOwnerCards"
          :class="ownedCardClasses"
          :isSelected="selectingStoredCard"
          @cardSelected="selectCard"
          @set-selected-method="setPaymentSelectedMethod(paymentOptions.STORED_CARD)"
        />
        <p
          v-else
          class="pe-text-white"
        >
          {{ $t("You don't have registered cards. Add one") }}
          <PEButton
            text
            tag="NuxtLink"
            to="/membership/CreditCards"
            class="pe-cursor-pointer"
          >
            {{ $t('Here') }}</PEButton
          >
        </p>
      </div>
      <div class="pe-basis-full">
        <section :class="newCardClasses">
          <label
            class="pe-pt-[1.5rem] pe-pl-0 pe-pb-8 pe-font-semibold pe-uppercase pe-text-white"
            >{{ $t('Pay with a New Card') }}</label
          >
          <ValidationObserver
            v-slot="{invalid}"
            ref="observer"
            tag="div"
            class="pe-w-full"
            vid="cardForm"
          >
            <div
              class="pe-p-0 pe-mt-[1.5rem] md:pe-8"
              @click="setPaymentSelectedMethod(paymentOptions.NEW_CARD)"
            >
              <div class="pe-grid md:pe-grid-cols-1 md:pe-gap-x-10">
                <div class="pe-mb-4 md:pe-mb-6">
                  <validation-provider
                    v-slot="{errors}"
                    rules="required|customOnlyText"
                    class="pe-w-full"
                    :disabled="isPausedFormValidations"
                    vid="firstName"
                  >
                    <PETextInput
                      v-model="creditCard.firstName"
                      :label="$t('Card Holder Name')"
                      :disabled="disabledNewCard"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </validation-provider>
                </div>
              </div>
              <div class="pe-grid md:pe-grid-cols-1 md:pe-gap-x-10">
                <div class="pe-mb-4 md:pe-mb-6">
                  <validation-provider
                    v-slot="{errors}"
                    rules="required|customCardValidation"
                    class="pe-w-full"
                    :disabled="isPausedFormValidations"
                    vid="card"
                  >
                    <PEInput
                      v-model="cardNumber"
                      :mask="currentMaskNumber"
                      :label="$t('Card Number')"
                      :disabled="disabledNewCard"
                      :class="bluredFocusClasses"
                      :append-icon="cardNumberIcon"
                      @input="onInputNumberCard"
                      @change="onChangeNumberCard"
                      @blur="onCardFocusBlur(false)"
                      @focus="onCardFocusBlur(true)"
                    >
                      <template #append-inner>
                        <PEIcon v-if="cardType" :key="cardNumberRef" class="pe-mr-[10px]" :size="35">{{ cardType }}</PEIcon>
                      </template>
                    </PEInput>
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </validation-provider>
                </div>
              </div>
              <div class="pe-grid md:pe-grid-cols-2 md:pe-gap-x-10">
                <div class="pe-mb-4 md:pe-mb-6">
                  <validation-provider
                    v-slot="{errors}"
                    rules="required|exp"
                    :disabled="isPausedFormValidations"
                    vid="expiration"
                  >
                    <PETextInput
                      v-model="expiration"
                      :label="$t('Expiration')"
                      :disabled="disabledNewCard"
                      :mask="currentMaskExp"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </validation-provider>
                </div>
                <div class="pe-mb-4 md:pe-mb-6">
                  <validation-provider
                    v-slot="{errors}"
                    rules="required|min:3"
                    :disabled="isPausedFormValidations"
                    vid="cvv"
                  >
                    <PETextInput
                      append-icon="card-credit"
                      :mask="currentMaskCvv"
                      label="CVV"
                      :disabled="disabledNewCard"
                      :class="bluredFocusCvvClasses"
                      :value="formatCVV"
                      @blur="onCvvFocusBlur(false)"
                      @focus="onCvvFocusBlur(true)"
                      @change="onChangeCvvCard"
                      @input="onEmitValidForm($event, invalid)"
                    />
                    <div class="pe-w-full pe-pt-2 pe-text-red-600">
                      <p>
                        {{ errors[0] }}
                      </p>
                    </div>
                  </validation-provider>
                </div>
              </div>
              <div v-if="showAmexForm" class='pe-grid md:pe-gap-x-10' >
                <!-- Aditional info for Amex cards -->
                <!-- Address -->
                <validation-provider
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="address"
                >
                  <PEInput v-model="creditCard.address" label="Address" :class="countryClasses" :disabled="disabledNewCard"/>
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>
                <!-- Country -->
                <validation-provider
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="countrySelect"

                >
                  <PESelect
                    v-model="country"
                    :items="countriesList"
                    label="Country"
                    :class="countryClasses"
                    :disabled="disabledNewCard"
                    @input="handleStates"
                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>
                <!-- State -->
                <validation-provider
                  v-if="hasStateItems"
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="stateSelect"
                >
                  <PESelect
                    v-model="selectedState"
                    :items="statesList"
                    :class="countryClasses"
                    label="State/Province"
                    :disabled="disabledNewCard"
                    @input="onStateChange"

                  />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>
                  <!-- City -->
                <validation-provider
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="city"
                >
                  <PEInput v-model="creditCard.city" label="City" :class="countryClasses"  :disabled="disabledNewCard"/>
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>


                <validation-provider
                  v-if="!hasStateItems"
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="stateInput"
                >
                  <PEInput v-model="creditCard.state" label="State" :disabled="disabledNewCard"/>
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>

                <!-- Zip -->
                <validation-provider
                  v-slot="{errors}"
                  rules="required"
                  class="pe-w-full pe-mb-4 md:pe-mb-6"
                  :disabled="isPausedFormValidations"
                  vid="zipcode"
                >
                  <PEInput
                    v-model="creditCard.zipcode"
                    label="ZIP Code"
                    :class="countryClasses"
                    @change="onEmitValidForm($event, invalid)"
                    :disabled="disabledNewCard"
                    />
                  <div class="pe-w-full pe-pt-2 pe-text-red-600">
                    <p>
                      {{ errors[0] }}
                    </p>
                  </div>
                </validation-provider>
              </div>
            </div>
          </ValidationObserver>
        </section>
      </div>
    </div>
    <hr
      v-if="showSepator"
      class="pe-hidden xl:pe-flow-root pe-border-1 pe-mt-8 pe-border-black"
    />
  </section>
</template>

<script lang="ts">
import {Component, Prop, Mixins, Watch, Ref} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, min} from 'vee-validate/dist/rules'
import PEPayWithMyCards from './PEPayWithMyCards/PEPayWithMyCards.vue'
import {PaymentStore} from '~/src/ui/store/paymentStore'
import {MembershipPaymentStore} from '~/src/ui/store/paymentMembershipStore'
import {PAYMENT_STATUS} from '~/src/app/paymentMembership/domain/enums/paymentStatus'
import {CardPaymentEntity} from '~/src/app/paymentMembership/domain/entities/cardPaymentEntity'
import {PaymentOptions} from '~/src/app/paymentMembership/domain/enums/paymentOptions'
import formatCardAsterizkTermination from '~/src/ui/mixins/FormatCardAsterizkTermination'

import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'
import {PECreditCard} from '~/src/app/bookingpayment/domain/entities/cardCredit'
import {PECardPaymentType} from '~/src/app/bookingpayment/domain/enums/cardPaymentType'
import {TypesCards} from '~/src/app/payments/domain/enum/typesCards'
import {Countries} from '~/src/app/bookingpayment/domain/enums/countries'
import {MexicoStates,UsaStates,CanadaStates} from '~/src/app/bookingpayment/domain/enums/states'
import CardsTypeRegEx from '~/src/app/payments/domain/entities/CardsTypeRegEx'

enum CardValidations {
  UNFORMATED_EXP_LENGTH = 5
}
@Component({
  name: 'pe-pay-with-card',
  i18n,
  components: {
    PEPayWithMyCards,
    ValidationObserver,
    ValidationProvider
  }
})
export default class PEPayWithCard extends Mixins(formatCardAsterizkTermination) {
  @Prop({required: true}) cards!: PECreditCard[]

  @Prop({required: true}) paymentType!: PECardPaymentType

  @Prop({required: false}) disabled!: boolean

  @Prop({required: false, default: false}) showBottomSepator!: boolean
  @Prop({required: false}) initialNewCard!: CardPaymentEntity | null

  @Ref('observer') readonly observer!: InstanceType<typeof ValidationObserver>

  paymenMembershipStore = new MembershipPaymentStore()

  paymentStore = new PaymentStore()

  paymentSelectedMethod = PaymentOptions.NONE

  public checkSaveCard = false

  public cardNumber = ''

  public expiration = ''

  public cardType: string = ''

  public validCardNumber: string | null = ''

  public isValidExp: boolean = false

  public validCardMM: string = ''

  public validCardYY: string = ''

  public currentYear = new Date().getFullYear().toString().substring(2, 5)

  public pausedObserver: boolean = false

  public cardNumberIcon: string = ''

  public cardNumberRef: number = 0

  public cardsCodes: string[] = Object.values(TypesCards)

  public regexCards: null | CardsTypeRegEx = null

  public validCreditCard: CardPaymentEntity = {
    id: null,
    cardType: '',
    number: '',
    firstName: '',
    securityCode: '',
    expMM: '',
    expYY: '',
    termination: '',
    country: 'USA',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  }


  public creditCard: CardPaymentEntity = {}

  public paymentOptions = PaymentOptions

  public isVisibleCardNumber: boolean = false

  public isVisibleCvv: boolean = false

  public country: Countries = Countries['USA']

  public states: string = 'UsaStates'

  public selectedState: null | string = null

  public address = ''

  public city = ''

  public zipcode = ''

  public showAmexForm: boolean = false

  public isCardBlured: boolean = false

  public isCvvMasked: boolean = false


  public get countriesList() {
    const keys = Object.keys(Countries)
    return keys.map((item: string) => {
      return {
        // @ts-ignore
        text: Countries[item],
        value: item,
      }
    })
  }

  public get statesList() {
    const availableCountries: string[] = ['MexicoStates', 'UsaStates', 'CanadaStates']
    const countriesList = {
      MexicoStates,
      UsaStates,
      CanadaStates,
    }

    if (!availableCountries.includes(this.states)) return []
    // @ts-ignore
    const stateKeysByCountry = Object.keys(countriesList[this.states])

    return stateKeysByCountry.map((item: string) => {
      return {
        // @ts-ignore
        text: countriesList[this.states][item],
        value: item,
      }
    })
  }

  get hasStateItems(): boolean {
    return this.statesList.length > 0
  }

  handleStates(value: any){

    const options: {[key: string]: string} = {
      'MEX': 'MexicoStates',
      'USA': 'UsaStates',
      'CAN': 'CanadaStates',
    }
    this.selectedState = null
    this.states = options[value.value]
    this.creditCard.country = value.value
  }

  onStateChange(value: any) {
    this.creditCard.state = value.value
  }



  get formatCVV() {
    if (!this.creditCard.securityCode) {
      return null
    }

    const {securityCode} = this.creditCard

    if (this.isVisibleCvv) return securityCode

    return this.formatToAsterizkTerminationCard(securityCode?.toString()?.length)
  }

  removeSpaces(str: string): string {
    if (!str) return ''
    return str.replace(/\s/g, '')
  }

  onChangeNumberCard(event: any) {
    const card = this.removeSpaces(event.target.value)
    const cardType = this.getCardType(card)
    if (this.cardType !== cardType) {
      this.setCardType(cardType)
    }
    this.setCardNumberIcon(cardType)

    this.showAmexForm = false
    this.showAmexForm = cardType === TypesCards.AMEX
  }

  public onInputNumberCard(input: string) {
    const card = this.removeSpaces(input)
    const cardType = this.getCardType(card)
    if (this.cardType !== cardType) {
      this.setCardType(cardType)
    }

    this.setCardNumberIcon(cardType)

    this.creditCard = {
      ...this.creditCard,
      number: card,
      termination: card.substr(-4),
      cardType,
    }
  }

  setCardType(val: string): void {
    this.cardType = val
  }

  setCardNumberIcon(cardType: string) {
    this.cardNumberIcon = cardType
    this.cardNumberRef++
  }

  public onChangeCvvCard(event: any, invalid: boolean): void {
    this.$nextTick(() => {
      this.creditCard = {
        ...this.creditCard,
        securityCode: event.target.value
      }
    })

    this.$emit('handleValidForm', invalid)
  }

  onEmitValidForm(event: any, invalid: boolean) {
    this.$emit('handleValidForm', invalid)
  }

  validateCard(value: string): boolean {
    const cardToValidate = this.removeSpaces(value)

    let evaluatedCard = ''

    if (this.regexCards === null) return false
    if (cardToValidate.match(this.regexCards.amex)) evaluatedCard = TypesCards.AMEX
    if (cardToValidate.match(this.regexCards.visa)) evaluatedCard = TypesCards.VISA
    if (cardToValidate.match(this.regexCards.mastercard)) evaluatedCard = TypesCards.MASTERCARD
    if (cardToValidate.match(this.regexCards.diners)) evaluatedCard = TypesCards.DINERS
    if (cardToValidate.match(this.regexCards.discover)) evaluatedCard = TypesCards.DISCOVER

    if (this.cardsCodes.includes(evaluatedCard) && cardToValidate.length >= 15) {
      return true
    }
    return false
  }

  @Watch('expiration')
  onExpirationChange() {
    if (this.validateExp(this.expiration)) {
      this.$nextTick(() => {
        const expMM = this.expiration.substring(0, 2)
        const expYY = this.expiration.substring(3, 5)
        this.creditCard = {
          ...this.creditCard,
          expMM,
          expYY,
        }
      })
    } else {
      this.$nextTick(() => {
        this.creditCard = {
          ...this.creditCard,
          expMM: '',
          expYY: ''
        }
      })
    }
  }

  validateExp(value: string) {
    if (value.length < CardValidations.UNFORMATED_EXP_LENGTH) {
      return false
    }

    const date = new Date()
    const currentMonth = date.getMonth() + 1

    const expMM = value.substring(0, 2)
    const expYY = value.substring(3, 5)

    const expMMInt = parseInt(expMM, 10)
    const expYYInt = parseInt(expYY, 10)

    if (expMMInt > 12 || expMMInt <= 0) {
      return false
    } else if (expYYInt < Number(this.currentYear)) {
      return false
    } else if (expYYInt === Number(this.currentYear)) {
      if (expMMInt < currentMonth) {
        return false //
      }
    }

    return true
  }

  onCardFocusBlur(value: boolean) {
    this.isVisibleCardNumber = value
  }

  onCvvFocusBlur(value: boolean) {
    this.isVisibleCvv = value
  }

  get bluredFocusClasses(): string {
    return this.isCardBlured ? 'cardBlur' : ''
  }

  get bluredFocusCvvClasses(): string {
    return this.isCvvMasked ? 'cardBlur' : ''
  }

  public setFormConfiguration(): void {
    extend('required', {...required, message: this.$t('validation.required') as string})

    extend('min', {
      ...min,
      message: this.$tc('validation.min', 3)
    })

    extend('customCardValidation', {
      computesRequired: true,
      validate: value => this.validateCard(value),
      message: this.$t('validation.card.number') as string
    })

    extend('customOnlyText', {
      computesRequired: true,
      validate: value => !!this.validateOnlyText(value),
      message: this.$t('validation.onlyText') as string
    })

    extend('exp', {
      computesRequired: true,
      validate: value => !!this.validateExp(value),
      message: this.$t('validation.card.expiration') as string
    })
  }

  public validateOnlyText(value: string): boolean {
    const regex = /^[a-zA-Z\s]*$/
    return regex.test(value)
  }

  public setPaymentSelectedMethod(method: PaymentOptions) {
    if (
      (this.disabled && method === PaymentOptions.NEW_CARD) ||
      (this.disabledOwnerCards && method === PaymentOptions.STORED_CARD)
    )
      return
    this.paymenMembershipStore.paymentSelectedMethod = method
    this.paymentSelectedMethod = method
  }

  get disabledNewCard(): boolean {
    return this.disabled
  }

  get disabledOwnerCards(): boolean {
    return this.disabled
  }

  get showSepator() {
    return !this.isMonthlyPayment && this.showBottomSepator
  }

  get hasCards() {
    return this.cards ? this.cards.length > 0 : false
  }

  get labelCheck() {
    return this.$t('Save this card for future transactions')
  }

  get rememberMeProps() {
    return {
      id: 'checkbox-remember-me',
      value: this.checkSaveCard,
      color: 'blue'
    }
  }

  get isMonthlyPayment() {
    return this.paymentType === PECardPaymentType.MonthlyPayment
  }

  get classes() {
    return {
      'xl:pe-divide-black': !this.isMonthlyPayment,
      'xl:pe-divide-x': !this.isMonthlyPayment
    }
  }

  get currentMaskCvv(): string {
    const mask = this.cardType === TypesCards.AMEX ? '####' : '###'
    if (this.isVisibleCvv) return mask
    return ''
  }

  get currentMaskNumber(): string {
    const regularCards = [TypesCards.VISA, TypesCards.MC, TypesCards.DISCOVER, TypesCards.DINERS]
    if (regularCards.includes(this.cardType as TypesCards)) return '#### #### #### ####'
    if (this.cardType ===  TypesCards.AMEX) return '#### ###### #####'
    return '################'
  }

  get currentMaskExp() {
    return '##/##'
  }

  get paymentResponse() {
    return this.paymenMembershipStore.addPaymentResponse
  }

  get isPausedFormValidations(): boolean {
    return this.selectingStoredCard || this.pausedObserver === true
  }

  get ownedCardClasses() {
    return {
      'pe-opacity-50': this.selectingNewCard
    }
  }

  get selectingNewCard() {
    return this.paymentSelectedMethod === PaymentOptions.NEW_CARD
  }

  get selectingStoredCard() {
    return this.paymentSelectedMethod === PaymentOptions.STORED_CARD
  }

  get newCardClasses() {
    return {
      'pe-opacity-50': this.selectingStoredCard,
      'md:px-8': true
    }
  }

  get countryClasses() {
    return '!pe-w-full'
  }

  clearForm() {
    this.checkSaveCard = false
    this.cardNumber = ''
    this.expiration = ''
    this.isValidExp = false
    this.cardType = ''
    this.validCardNumber = ''
    this.validCardMM = ''
    this.validCardYY = ''
    this.country = Countries.USA
    this.states = 'UsaStates'
    this.selectedState = null
    this.showAmexForm = false
    this.validCreditCard = {
      id: null,
      cardType: '',
      number: '',
      firstName: '',
      securityCode: '',
      expMM: '',
      expYY: '',
      country: 'USA',
      address: '',
      city: '',
      state: '',
      zipcode: '',
    }
    this.creditCard = {}
    this.setCardNumberIcon('')
  }

  selectCard(cardSelected: CardPaymentEntity) {
    this.$emit('selectedNewCard', cardSelected, false)
  }

  getCardType(number: string): string {
    if (this.regexCards === null) return ''
    if (number.match(this.regexCards.amex)) return TypesCards.AMEX
    if (number.match(this.regexCards.visa)) return TypesCards.VISA
    if (number.match(this.regexCards.mastercard)) return TypesCards.MASTERCARD
    if (number.match(this.regexCards.diners)) return TypesCards.DINERS
    if (number.match(this.regexCards.discover)) return TypesCards.DISCOVER
    return 'OTHER'
  }

  @Watch('paymentResponse')
  handlePayment() {
    this.pausedObserver = true
    if (this.paymentResponse.status === PAYMENT_STATUS.SUCCESS) {
      this.clearForm()
      // this.pausedObserver = false
      this.observer.reset()
      this.setPaymentSelectedMethod(PaymentOptions.NONE)
    }
  }

  isCvvValid(cvv: any): boolean {
    if (!cvv) return false
    return cvv.length >= 3
  }

  @Watch('paymentSelectedMethod')
  handleSelectedMethod(value: PaymentOptions) {
    if (value !== PaymentOptions.NEW_CARD) {
      // this.pausedObserver = true
      this.clearForm()
      this.paymenMembershipStore.setValidCardForm(false)
      this.paymenMembershipStore.clearNewCard()
      // this.pausedObserver = false
      this.$nextTick(() => {
        this.observer.reset()
      })
    }
  }

  @Watch('creditCard', {deep: true})
  handleCreditCard(newValue: CardPaymentEntity) {
    if (
      (!!newValue.cardType &&
      !!this.isCvvValid(newValue.securityCode) &&
      !!newValue.firstName &&
      !!newValue.expMM &&
      !!newValue.expMM &&
      !!newValue.firstName &&
      !!this.validateOnlyText(newValue.firstName) &&
      this.cardType !== TypesCards.AMEX) ||

      (this.cardType === TypesCards.AMEX &&
      !!newValue.cardType &&
      !!this.isCvvValid(newValue.securityCode) &&
      !!newValue.firstName &&
      !!newValue.expMM &&
      !!newValue.expMM &&
      !!newValue.firstName &&
      !!this.validateOnlyText(newValue.firstName) &&
      !!newValue.country &&
      !!newValue.address &&
      !!newValue.city &&
      !!newValue.state &&
      !!newValue.zipcode )

    ) {
      this.paymenMembershipStore.saveNewCard(newValue)
      this.paymenMembershipStore.setValidCardForm(true)
      this.$emit('selectedNewCard', newValue, true)
    } else {
      this.paymenMembershipStore.saveNewCard({})
      this.$emit('selectedNewCard', {}, false)
      this.paymenMembershipStore.setValidCardForm(false)
    }
  }


  mounted() {
    this.setFormConfiguration()
    //if has card selected
    this.hasCards
      ? this.setPaymentSelectedMethod(PaymentOptions.STORED_CARD)
      : this.setPaymentSelectedMethod(PaymentOptions.NEW_CARD)

    if (
      this.initialNewCard !== null &&
      this.initialNewCard !== undefined &&
      this.initialNewCard.cardType !== null &&
      this.initialNewCard.cardType !== undefined &&
      this.initialNewCard.firstName !== null &&
      this.initialNewCard.firstName !== undefined
    ) {
      this.setPaymentSelectedMethod(PaymentOptions.NEW_CARD)
      this.creditCard = this.initialNewCard
      this.validCreditCard = this.initialNewCard
      this.expiration = this.initialNewCard.expMM + '/' + this.initialNewCard.expYY
      this.setCardNumberIcon(String(this.initialNewCard.cardType))
    }

    this.regexCards = this.paymentStore.getRegexCards()
  }
}
</script>
<style lang="scss">
.cardBlur {
  input {
    filter: blur(4px);
  }
}
</style>

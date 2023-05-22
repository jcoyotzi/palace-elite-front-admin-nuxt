<template>
  <section @click="setSelectedMethod">
    <label class="pe-pb-8 pe-font-semibold pe-uppercase pe-text-white">
      {{ $t('Pay with my Cards') }}
    </label>
    <PERadioGroup
      v-model="cardSelected"
      :items="cardsItems"
      :disabled="disabled"
      color="black"
      :position="'vertical'"
      class="pe-pl-0 xl:pe-pl-4 pe-pt-8"
      @input="selectStoredCard"
    >
      <template slot="children">
        <label
          class="pe-font-[1rem] pe-line-height-[1.5rem] pe-ml-11 pe-cursor-pointer pe-text-white pe-block"
        >
          {{ exipireDate }}
        </label>
        <ValidationProvider
          v-slot="{errors}"
          rules="required|min:3"
          vid="storedCardCvv"
        >
          <PETextInput
            class="pe-mt-[8px] pe-mb-8 pe-md:!mt-[8px] pe-!inline-block pe-ml-11"
            label="CVV"
            append-icon="card-credit"
            :mask="currentMaskCvv"
            :disabled="disabled"
            :value="formatCVV"
            @blur="onBlurFocusInputCvvCard(false)"
            @focus="onBlurFocusInputCvvCard(true)"
            @change="onChangeCvvCard"
            @keydown.tab="handleTab"
          />
          <div class="pe-w-full pe-pt-2 pe-text-red-600">
            <p>
              {{ errors[0] }}
            </p>
          </div>
        </ValidationProvider>
      </template>
    </PERadioGroup>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Mixins, Watch, Emit} from 'vue-property-decorator'
import {ValidationProvider, extend} from 'vee-validate'
import {required, min} from 'vee-validate/dist/rules'
import CreditCardMixin from '../mixins/creditCardMixin'
import {PaymentOptions} from '~/src/app/paymentMembership/domain/enums/paymentOptions'
import {MembershipPaymentStore} from '~/src/ui/store/paymentMembershipStore'
import {CardPaymentEntity} from '~/src/app/paymentMembership/domain/entities/cardPaymentEntity'
import {PAYMENT_STATUS} from '~/src/app/paymentMembership/domain/enums/paymentStatus'
import formatCardAsterizkTermination from '~/src/ui/mixins/FormatCardAsterizkTermination'
import GenerateIdMixin from '~/src/ui/mixins/generateIdMixin'
import i18n from '~/src/ui/i18n/booking/paymentProcess/paymentProcess.lang'
import {PECreditCard} from '~/src/app/bookingpayment/domain/entities/cardCredit'
import {TypesCards} from '~/src/app/payments/domain/enum/typesCards'

@Component({
  name: 'pe-pay-with-my-cards',
  i18n,
  components: {
    // PERadioGroup,
    // PETextInput,
    ValidationProvider
  }
})
export default class PEPayWithMyCards extends Mixins(
  CreditCardMixin,
  formatCardAsterizkTermination,
  GenerateIdMixin
) {
  @Prop({required: true}) cards!: PECreditCard[]

  @Prop({required: false, default: false}) disabled!: boolean

  @Prop({required: false, default: false}) isSelected!: boolean

  cardSelected = ''

  cvv = ''

  storedSelectedCard: CardPaymentEntity = {}

  public paymenMembershipStore = new MembershipPaymentStore()

  public paymentOptions = PaymentOptions

  public isCvvMasked: boolean = false

  activeInputCvv: boolean = false

  checkboxTerms: any = null

  get cardSelectedRadio() {
    return this.cardsItems.find((card: any) => card.id === this.cardSelected)
  }

  get cardsItems() {
    return this.cards.map(card => ({
      id: card.cardId.toString(),
      name: this.generateId('card'),
      labelText: this.last4DigitsCard(card.cardNumber),
      prependIcon: this.financialStamp(card.cardStamp),
      cardStamp: card.cardStamp,
      expiryDate: card.expiryDate
    }))
  }

  @Watch('isSelected')
  onSelectedChanged(value: boolean) {
    this.cardSelected = ''
    this.cvv = ''
    this.cvv = ''
    this.$emit('cardSelected', {})
    this.paymenMembershipStore.setStoredCardValid(false)
    this.paymenMembershipStore.useStoredCard({})
    this.paymenMembershipStore.clearNewCard()
  }

  get exipireDate(): string {
    return ` ${this.$t('Expires on')}  ${
      this.cards.find(card => card.cardId.toString() === this.cardSelected)?.expiryDate
    }`
  }

  get cardType() {
    return this.cards.find(card => card.cardId.toString() === this.cardSelected)?.cardStamp
  }

  get bluredFocusCvvClasses(): string {
    return this.isCvvMasked ? 'cardBlur' : ''
  }

  get isStoredCardValid(): boolean {
    return !!this.storedSelectedCard.cardType && !!this.storedSelectedCard.id && !!this.isCvvValid
  }

  get isCvvValid(): boolean {
    return this.cvv.length > 2
  }

  get paymentResponse() {
    return this.paymenMembershipStore.addPaymentResponse
  }

  get currentMaskCvv(): string {
    if (this.activeInputCvv) {
      if (this.cardSelectedRadio?.cardStamp === TypesCards.AMEX) return '####'
      return '###'
    }
    return ''
  }

  get formatCVV() {
    if (this.activeInputCvv) return ''

    return this.formatToAsterizkTerminationCard(this.cvv.length)
  }

  selectStoredCard(): void {
    this.clearCvv()
    this.$emit('cardSelected', {})
    this.paymenMembershipStore.setStoredCardValid(false)
    this.paymenMembershipStore.useStoredCard({})
  }

  handleTab(event: any) {
    event.preventDefault()
  }

  public onChangeCvvCard(event: any): void {
    event.preventDefault()

    try {
      this.checkboxTerms.focus()
    } catch (error) {}

    this.cvv = event.target.value
    this.storedSelectedCard = {
      cardType: this.cardType,
      id: this.cardSelected,
      securityCode: this.cvv
    }
    if (this.isStoredCardValid) {
      this.$emit('cardSelected', this.storedSelectedCard)
      this.paymenMembershipStore.setStoredCardValid(true)
      this.paymenMembershipStore.useStoredCard(this.storedSelectedCard)
    } else {
      this.$emit('cardSelected', {})
      this.paymenMembershipStore.setStoredCardValid(false)
      this.paymenMembershipStore.useStoredCard({})
    }
  }

  clearCvv(): void {
    this.cvv = ''
  }

  public onBlurFocusInputCvvCard(value: boolean): void {
    this.activeInputCvv = value
  }

  public setPaymentSelectedMethod(method: PaymentOptions) {
    this.paymenMembershipStore.paymentSelectedMethod = method
  }

  @Watch('paymentResponse')
  handlePayment() {
    if (this.paymentResponse.status === PAYMENT_STATUS.SUCCESS) {
      this.setPaymentSelectedMethod(PaymentOptions.NONE)
      this.paymenMembershipStore.setStoredCardValid(false)
      this.paymenMembershipStore.useStoredCard({})
    }
  }

  mounted() {
    this.setFormConfiguration()
    this.checkboxTerms = document.getElementById('idTerms')
    // find card selected and asign to selected card
    const cardSelected = this.cards.find(card => card.selected === true)
    if (cardSelected) {
      this.cardSelected = cardSelected.cardId.toString()
      this.storedSelectedCard = {
        cardType: this.cardType,
        id: this.cardSelected,
        securityCode: this.cvv
      }
      this.activeInputCvv = false
      this.cvv = '***'
    } else {
      this.activeInputCvv = true
      this.cvv = ''
      this.cardSelected = ''
    }
  }

  setFormConfiguration(): void {
    extend('required', {
      ...required,
      message: this.$t('validation.required') as string
    })

    extend('min', {
      ...min,
      message: this.$tc('validation.min', 3)
    })
  }

  @Emit()
  setSelectedMethod() {}
}
</script>
<style lang="scss">
.cardBlur {
  input {
    filter: blur(4px);
  }
}
</style>

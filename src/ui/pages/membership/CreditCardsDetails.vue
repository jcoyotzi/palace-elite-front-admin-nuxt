<template>
  <div class="pe-py-[0px]">
    <div class="pe-text-center md:pe-text-left pe-mt-[80px] md:pe-mt-0">
      <span class="pe-font-serif pe-text-[24px] md:pe-text-[32px] pe-text-white pe-uppercase">{{
        $t('creditCardDetails')
      }}</span>
    </div>
    <div class="pe-flex pe-justify-between pe-mt-[40px] md:pe-mt-[20px]">
      <span
        class="pe-text-white pe-flex pe-cursor-pointer"
        @click.prevent="goToListCards"
      >
        <PEIcon
          class="pe-text-blue-light"
          size="25"
          >chevron-left</PEIcon
        >
        {{ $t('backToList') }}
      </span>
      <!-- <span
        class="cursor-pointer text-blue-light font-serif text-[16px] underline font-normal"
        @click.prevent="showModalDeleteCardCredit"
      >
        DELETE CREDIT CARD
      </span> -->
    </div>
    <ValidationObserver
      v-slot="{invalid}"
      tag="div"
      class="pe-w-full"
    >
      <div
        class="pe-bg-black-light pe-mt-[40px] pe-py-[40px] pe-px-[20px] md:pe-py-[50px] md:pe-px-[40px] pe-w-full pe-h-auto pe-rounded-[10px]"
      >
        <div class="xl:pe-grid xl:pe-grid-cols-2 pe-gap-12">
          <div class="pe-mb-[40px]">
            <PETextInput
              v-model="selectedCardCredito.cardHolder"
              :label="$t('cardHolder')"
              disabled
              class="pe-mb-10 pe-w-full"
            />
            <validation-provider
              v-slot="{errors}"
              rules="required"
              class="pe-w-full"
            >
              <PEInput
                class="pe-mt-[45px]"
                :label="$t('numberCard')"
                :value="formatNumber"
                :mask="currentMaskNumber"
                @blur="onBlurFocusInputNumberCard(false)"
                @focus="onBlurFocusInputNumberCard(true)"
                @input="onChangeNumberCard"
              >
                <template
                  v-if="!isMethodAdd"
                  #append-inner
                >
                  <PEIcon
                    v-if="cardStampChange"
                    class="pe-mr-[10px]"
                    :size="35"
                    >{{ cardStamp }}</PEIcon
                  >
                </template>
              </PEInput>
              <div class="pe-w-full pe-pt-2 pe-text-red-600">
                <p>
                  {{ errors[0] }}
                  {{ errorsPersonalized }}
                </p>
              </div>
            </validation-provider>
            <validation-provider rules="required">
              <input
                :value="selectedCardCredito.cardStamp"
                hidden
              />
            </validation-provider>
            <div class="md:pe-flex pe-justify-between pe-gap-6">
              <validation-provider
                v-slot="{errors}"
                :rules="{
                  required: true,
                  mincvv: {min: minCVVLenght},
                  max: minCVVLenght
                }"
              >
                <PEInput
                  class="pe-mt-[35px] md:!pe-mt-[35px]"
                  label="CVV"
                  :mask="currentMaskCvv"
                  :value="formatCVV"
                  @blur="onBlurFocusInputCvvCard(false)"
                  @focus="onBlurFocusInputCvvCard(true)"
                  @input="onChangeCvvCard"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>

              <validation-provider
                v-slot="{errors}"
                rules="required"
              >
                <PEInput
                  v-model="selectedCardCredito.dueDate"
                  class="pe-mt-[40px] md:!pe-mt-[35px]"
                  :label="$t('dueDate')"
                  :mask="'##/##'"
                />
                <div class="pe-w-full pe-pt-2 pe-text-red-600">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <!-- <PECheckbox
              class="mt-[40px]"
              id='checkbox-remember-me'
              color='blue'
              v-model="selectedCardCredito.cardMain"
              disabled
            >
              <slot name="default">
                <label class="cursor-pointer text-white">Select as main card</label>
              </slot>
            </PECheckbox> -->
            <div class="pe-mt-[30px]">
              <span
                class="pe-text-blue-light pe-cursor-pointer pe-underline pe-text-[12px] pe-font-normal pe-font-sans"
                @click.prevent="openModalTerms"
              >
                {{ $t('termsAndConditions') }}
              </span>
            </div>
          </div>
          <div class="">
            <card :selected-card-credit="selectedCardCredito" />
          </div>
        </div>
        <!-- section actions -->
        <div class="pe-mt-[30px] xl:!pe-mt-[0px]">
          <div class="xl:pe-text-right xl:pe-justify-end pe-hidden xl:!pe-flow-root">
            <PEButton
              class="pe-mr-[50px] pe-w-full xl:!pe-w-[150px] pe-h-[50px] pe-text-blue-light pe-underline pe-uppercase pe-text-[16px] pe-font-normal pe-font-serif"
              without-border
              @click.prevent="showModalCancelUpdateCardCredit"
            >
              {{ $t('cancel') }}
            </PEButton>
            <PEButton
              :disabled="invalid"
              class="pe-uppercase pe-w-full xl:!pe-w-[200px] pe-h-[50px]"
              solid
              :loading="loading"
              @click.prevent="saveCardCredit"
            >
              {{ $t('save') }}
            </PEButton>
          </div>
          <div class="pe-mt-[60px] md:pe-text-right xl:pe-justify-end pe-flow-root xl:pe-hidden">
            <PEButton
              class="pe-uppercase pe-w-full xl:!pe-w-[200px] pe-h-[50px]"
              solid
              :disabled="invalid"
              :loading="loading"
              @click.prevent="saveCardCredit"
            >
              {{ $t('saveChanges') }}
            </PEButton>
            <PEButton
              class="pe-mr-[50px] pe-mt-[40px] pe-w-full pe-h-[50px] pe-text-blue-light pe-underline pe-uppercase pe-text-[16px] pe-font-normal pe-font-serif"
              without-border
              @click.prevent="showModalCancelUpdateCardCredit"
            >
              {{ $t('cancel') }}
            </PEButton>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <confirm-delete-card />
    <ModalTermsAndConditions v-model="showModalTerms" />
    <confirm-cancel-update-card @back="goToListCards" />
    <confirm-update-card-credit @confirm="confirmModalConfirmationUpdateCardCredit" />
  </div>
</template>
<script lang="ts">
import {Component, Mixins, Watch, Emit} from 'vue-property-decorator'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, max} from 'vee-validate/dist/rules'
import {PaymentStore} from '~/src/ui/store/paymentStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'

// Plugins
import Card from '~/src/ui/components/Membership/CreditCards/Card.vue'
import ConfirmDeleteCard from '~/src/ui/components/Membership/CreditCards/confirmDeleteCard.vue'
import ConfirmCancelUpdateCard from '~/src/ui/components/Membership/CreditCards/confirmCancelUpdateCardCredit.vue'
import ModalTermsAndConditions from '~/src/ui/components/Membership/CreditCards/modalTermsAndConditions.vue'
import ConfirmUpdateCardCredit from '~/src/ui/components/Membership/CreditCards/confirmUpdateCardCredit.vue'
import {MethodCard} from '~/src/app/payments/domain/enum/methodCardsCredit'
import {CardsCreditEntity} from '~/src/app/payments/domain/entities/cardsCreditEntity'
// import { TypesCards } from '~/src/app/payments/domain/enum/typesCards';
import formatCardAsterizkTermination from '~/src/ui/mixins/FormatCardAsterizkTermination'
import PayloadUpdateCardCredit from '~/src/app/payments/domain/entities/payloadUpdateCardCredit'
import i18n from '~/src/ui/i18n/membership/creditCards.lang'
import {LayoutStore} from '../../store/layoutStore'
import {TypesCards} from '~/src/app/payments/domain/enum/typesCards'

enum cvv4Digits {
  AMEX
}

enum cvv3Digits {
  MC,
  VISA,
  DISCOVER,
  DINERS
}

@Component({
  i18n,
  meta: {
    auth: true
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    Card,
    ModalTermsAndConditions,
    ConfirmDeleteCard,
    ConfirmCancelUpdateCard,
    ConfirmUpdateCardCredit
  }
})
export default class CreditCardsDetails extends Mixins(formatCardAsterizkTermination) {
  paymentStore = new PaymentStore()

  authStore = new AuthStore()

  cvvMasks = new Map()

  activeInputNumber: boolean = false

  errorsPersonalized: string = ''

  loading: boolean = false

  showModalTerms: boolean = false

  activeInputCvv: boolean = false

  selectedCardCredito: CardsCreditEntity = {
    ...this.paymentStore.selectedCardCredit
  }

  cardStampChange: boolean = true

  get methodCardCredit(): string {
    return this.paymentStore.methodCardCredit
  }

  get isMethodAdd(): boolean {
    return this.paymentStore.methodCardCredit === MethodCard.ADD
  }

  get currentMaskCvv(): string {
    if (this.activeInputCvv) return this.cvvMasks.get(this.cardStamp) ?? '###'
    return ''
  }

  get minCVVLenght() {
    return this.cvvMasks.get(this.cardStamp)?.length ?? 3
  }

  get currentMaskNumber() {
    if (this.activeInputNumber) return '#### #### #### ####'
    return ''
  }

  get cardStamp(): string {
    return this.selectedCardCredito.cardStamp ? this.selectedCardCredito.cardStamp : ''
  }

  get formatCVV() {
    const {securityCode} = this.selectedCardCredito

    if (this.activeInputCvv) return ''

    return this.formatToAsterizkTerminationCard(securityCode?.length)
  }

  get formatNumber() {
    const {cardNumber, cardTermination, cardStamp} = this.selectedCardCredito

    if (this.activeInputNumber) return cardNumber

    if (cardTermination) return this.formatSpaceAsterizk(12, cardTermination, cardStamp!)

    return this.formatSpaceAsterizk(cardNumber?.length, '', cardStamp!)
  }

  get company(): number {
    return this.authStore.userCompany!
  }

  get payloadUpdateCardCredit(): PayloadUpdateCardCredit {
    const {id, cardNumber, dueDate, cardStamp, securityCode} = this.selectedCardCredito
    const payload = {
      InfoCreditCard: [
        {
          id,
          cardNumber,
          cardStamp: this.getCardStamp(cardStamp),
          dueDate,
          securityCode
        }
      ],
      recNum: 4,
      application: this.applicationUserMember,
      company: this.company,
      lang: 'E',
      monthPaym: '4',
      isNational: this.isNational,
      terms: true
    }

    if (this.selectedCardCredito.dueDate === this.paymentStore.selectedCardCredit.dueDate)
      delete payload.InfoCreditCard[0].dueDate

    if (this.selectedCardCredito.securityCode === '000')
      delete payload.InfoCreditCard[0].securityCode

    if (this.selectedCardCredito.cardStamp === this.paymentStore.selectedCardCredit.cardStamp)
      delete payload.InfoCreditCard[0].cardStamp

    return payload
  }

  get cardsRegEx() {
    return this.paymentStore.cardsRegEx
  }

  get applicationUserMember(): string {
    return this.authStore.applicationUserMember as string
  }

  get isNational(): boolean {
    return this.authStore.isNational as boolean
  }

  // Hooks
  mounted() {
    this.setFormConfiguration()

    const cards4Digits = Object.keys(cvv4Digits)
    const cards3Digits = Object.keys(cvv3Digits)

    cards4Digits.forEach(card => {
      this.cvvMasks.set(card, '####')
    })
    cards3Digits.forEach(card => {
      this.cvvMasks.set(card, '###')
    })
  }

  getCardStamp(cardStamp: any) {
    if (cardStamp === TypesCards.AMEX) return 'AEX'

    if (cardStamp === TypesCards.VISA) return 'V'
    
    return cardStamp
  }

  openModalTerms(): void {
    this.showModalTerms = true
  }

  public showModalCancelUpdateCardCredit(): void {
    this.paymentStore.showModalCancelUpdateCardCredit = true
  }

  public showModalDeleteCardCredit(): void {
    this.paymentStore.showModalDeleteCardCredit = true
  }

  public get layoutStore(): LayoutStore {
    return new LayoutStore()
  }

  public async saveCardCredit() {
    this.loading = true
    try {
      if (this.methodCardCredit === MethodCard.ADD)
        this.paymentStore.addCardCredit(this.selectedCardCredito)
      else {
        const response = await this.paymentStore.updateCardCredit(this.payloadUpdateCardCredit)

        if (response.errors === null) {
          this.paymentStore.showModalConfirmationUpdateCardCredit = true
          return
        }
        this.layoutStore.showSnackbar('', this.$t('updateCreditCardMessage') as string)
      }
    } catch (error) {
      this.layoutStore.showSnackbar('', this.$t('updateCreditCardMessageError') as string)
    } finally {
      this.loading = false
    }
  }

  confirmModalConfirmationUpdateCardCredit() {
    this.paymentStore.setCardsCredit([])
    this.paymentStore.getCardsCredit(this.applicationUserMember, this.isNational)
    this.goToListCards()
  }

  public setFormConfiguration(): void {
    extend('required', {...required, message: 'This field is required.'})
    extend('mincvv', {
      params: ['min'],
      validate: (value, {min}: any) => {
        if (value.length < min) {
          return false
        }
        return true
      },
      message: `This field requires a minimum of {min} characters.`
    })
    extend('max', {
      ...max,
      message: `This field requires a maximun of 3 characters.`
    })
  }

  public onChangeCvvCard(event: any): void {
    if (!this.activeInputCvv) return
    const inputValue = event ?? ''
    this.selectedCardCredito.securityCode = inputValue
  }

  public onChangeNumberCard(event: any) {
    if (!this.activeInputNumber) return
    const inputValue = event ?? ''
    this.cardStampChange = false
    const value = inputValue.replaceAll(' ', '')
    const cardStamp = this.paymentStore.verifyTypeCard(value)

    this.$nextTick(() => {
      this.selectedCardCredito = {
        ...this.selectedCardCredito,
        cardNumber: value,
        cardTermination: value.substr(12, 4),
        cardStamp
      }
      this.cardStampChange = true
    })
  }

  public onBlurFocusInputNumberCard(value: boolean): void {
    this.activeInputNumber = value
  }

  public onBlurFocusInputCvvCard(value: boolean): void {
    this.activeInputCvv = value
  }

  public goToListCards(): void {
    this.paymentStore.resetCardCreditSelected()
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/CreditCards'))
  }

  @Emit()
  onMenuItem() {
    const items = [
      {
        page: this.localePath('/membership/SummaryAndPayments'),
        title: 'Membership'
      },
      {
        title: 'Credit Cards',
        icon: 'card-credit',
        page: this.localePath('/membership/CreditCards')
      }
    ]
    return items
  }

  @Watch('selectedCardCredito.cardStamp')
  onChangeCardStamp(newValue: string) {
    if (newValue === '') this.errorsPersonalized = 'The card type is not correct'
    else this.errorsPersonalized = ''
  }
}
</script>

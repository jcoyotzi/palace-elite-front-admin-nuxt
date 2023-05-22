<template>
  <div class="pe-py-[0px]">
    <div class="pe-text-center pe-mt-[80px] md:pe-mt-0 md:pe-text-left">
      <span class="pe-font-serif pe-text-[24px] md:pe-text-[32px] pe-text-white pe-uppercase">
        {{ $t('creditCards') }}
      </span>
    </div>
    <div class="pe-mt-[30px]">
      <span class="pe-font-sans pe-text-[24px] pe-text-white">
        {{ $t('mainCards') }}
      </span>
      <div>
        <PELoadingData v-if="showLoadingCardCredit" />
        <div v-else class="md:pe-flex md:pe-flex-wrap pe-gap-6 pe-mt-[30px]">
          <div
            v-if="cardsMain.length === 0"
            class="pe-text-white pe-mt-[50px] lg:pe-mt-[0px]"
          >
            <div class="pe-font-serif pe-text-[24px] uppercase">
              {{ $t('notFound') }}
            </div>
            <div class="pe-text-[16px] pe-font-sans">
              {{ $t('text') }}
            </div>
          </div>
          <PECardCredit
            v-else
            v-for="(card, index) in cardsMain"
            :key="index"
            class="pe-mb-[40px] md:!pe-mb-[0px]"
            v-bind="card"
            :locale="locale"
            @edit="onEdited(card)"
            @remove="onRemoved(card)"
            @on-menu-item="onMenuItem()"
          />
        </div>
      </div>
    </div>
    <div v-if="false" class="pe-font-sans pe-text-[24px] pe-mt-[30px] pe-text-white">
      {{ $t('othersCards') }}
    </div>
    <div v-if="false" class="md:pe-flex md:pe-flex-wrap pe-gap-6 pe-mt-[30px]">
      <PEAddCardCredit
        class="pe-mb-[40px] md:!pe-h-[217px] md:pe-mr-[10px] md:pe-mb-[30px]"
        :text="$t('addNewCard')"
        :disabled="true"
        @click.prevent="onAdd()"
      />
    </div>
    <confirm-delete-card />
  </div>
</template>
<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import PELoadingData from '../../components/PELoadingData.vue'
import {CardsCreditEntity} from '~/src/app/payments/domain/entities/cardsCreditEntity'
import {PaymentStore} from '~/src/ui/store/paymentStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import ConfirmDeleteCard from '~/src/ui/components/Membership/CreditCards/confirmDeleteCard.vue'
import {MethodCard} from '~/src/app/payments/domain/enum/methodCardsCredit'
import i18n from '~/src/ui/i18n/membership/creditCards.lang'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  i18n,
  meta: {
    auth: true
  },
  components: {
    ConfirmDeleteCard,
    PELoadingData,
  }
})
export default class CreditCardsDetails extends Mixins (BasePageStrapiMixin) {
  paymentStore = new PaymentStore()

  authStore = new AuthStore()

  get locale() {
    return this.$i18n.locale
  }

  get showLoadingCardCredit(): boolean {
    return this.paymentStore.showLoadingCardCredit
  }

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.CreditCards)
  }

  get cardsMain(): CardsCreditEntity[] {
    return this.paymentStore.cardsCredit
  }

  onEdited(card: CardsCreditEntity) {
    this.onMenuItem()
    this.paymentStore.methodCardCredit = MethodCard.UPDATE
    this.paymentStore.cardCreditSelected = card
    this.$nuxt.$router.push(this.localePath('/membership/CreditCardsDetails'))
  }

  onRemoved(card: CardsCreditEntity) {
    this.paymentStore.cardCreditSelected = card
    this.paymentStore.showModalDeleteCardCredit = true
  }

  onAdd() {
    this.paymentStore.methodCardCredit = MethodCard.ADD
    this.paymentStore.resetCardCreditSelected()
    this.$nuxt.$router.push(this.localePath('/membership/CreditCardsDetails'))
  }

  @Emit()
  onMenuItem(page: string = this.localePath('/membership/CreditCardsDetails'), title: string = 'Details') {
    const items = [
      {
        page: this.localePath('/membership/SummaryAndPayments'),
        title: this.$t('membership'),
      },
      {
        title: this.$t('creditCards'),
        icon: 'card-credit',
        page: this.localePath('/membership/CreditCards')
      },
      {
        page,
        title
      }
    ]
    return items
  }

  @Emit()
  onMenuIndex(index: number) {
    return index
  }
}
</script>

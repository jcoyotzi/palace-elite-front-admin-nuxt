<template>
  <div class="w-full">
    <div class="pe-text-center md:pe-text-left">
      <span
        class="md:pe-font-sans uppercase pe-font-serif pe-font-medium md:pe-font-semibold pe-text-[24px] md:pe-text-[32px] pe-text-white"
      >
        {{ $t('universalCredit') }}
      </span>
    </div>
    <div
      v-if="!showNotFound"
      class="pe-mt-[40px] pe-justify-between md:pe-flex pe-py-[46px] pe-px-[50px] pe-bg-black-light pe-rounded-[10px] pe-h-auto pe-w-full"
    >
      <div class="md:pe-flex pe-justify-start pe-gap-20">
        <div class="pe-text-white pe-font-sans">
          <div class="pe-text-[16px]">{{ $t('amountAvailable') }}:</div>
          <div class="pe-text-[32px]">
            {{ amountAvailable }}
          </div>
        </div>
        <div
          class="pe-hidden md:pe-flow-root pe-border pe-border-l-1 pe-border-black pe-opacity-50"
        />
        <div class="pe-text-white pe-font-sans pe-mt-[30px] md:pe-mt-[0px]">
          <div class="pe-text-[16px]">{{ $t('totalEarned') }}:</div>
          <div class="pe-text-[32px]">
            {{ totalEarned }}
          </div>
        </div>
      </div>

      <div class="pe-text-white pe-font-sans pe-justify-end pe-mt-[40px] md:pe-mt-[0px]">
        <PEButton
          solid
          class="pe-h-[50px] pe-w-full pe-uppercase md:pe-mt-[10px]"
          tag="a"
          href="/build-your-search"
        >
          {{ $t('useNow') }}
        </PEButton>
      </div>
    </div>

    <div
      v-else
      class="pe-mt-[50px] pe-text-white"
    >
      <div class="pe-font-serif pe-text-[24px] uppercase">
        {{ $t('notFound') }}
      </div>
      <div class="pe-text-[16px] pe-font-sans">
        {{ $t('text') }}
      </div>
    </div>
    <WalletCommonTable
      class="pe-mt-[100px]"
      :properties-table="bindTablePagination"
      :items="breakdownPaymentsBalance"
      @update-items="onChangeItems"
    >
      <div
        v-for="(payment, index) in itemsTableComputed"
        :key="index"
        class="pe-mt-[50px] pe-mb-[35px]"
      >
        <PEExpansionTableItem
          :locale="localeShort"
          :value="payment.active"
          v-bind="payment"
          @input="onChangeActiveUniversalCredit($event, index)"
        />
        <!-- @more-details="onClickDetails" -->
      </div>
    </WalletCommonTable>
  </div>
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import DateFormaterProvition from '~/src/ui/mixins/DateFormaterProvition'
import {UseAuth} from '~/src/ui/store/auth'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import i18n from '~/src/ui/i18n/wallet/universalCredit.lang'
import {WalletStore} from '~/src/ui/store/benefits/walletStore'

@Component({
  i18n,
  meta: {
    auth: true
  }
})
export default class UniversalCredit extends Mixins(CurrencyFormatDivisa, DateFormaterProvition) {
  public itemsTable: any[] = []

  async beforeMount() {
    this.walletStore.itemIndex = 1
    await this.walletStore.getSummarys(this.applicationUserMember!)
  }

  get breakdownPaymentsBalance() {
    return this.walletStore.universalCredits
  }

  get showNotFound() {
    return this.walletStore.summarysCards?.account === ''
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get localeShort(): string {
    return this.$i18n.locale
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get itemsTableComputed() {
    return this.itemsTable.map(credit => ({
      ...credit,
      expiration: this.dateFormaterProvition(credit.expiration),
      items: credit.items.map((item: any) => ({
        title: item.title,
        subtitle: `${this.$t('referenceNumber')}: ${item.subTitle}`,
        date: this.dateFormaterProvition(item.date, 'short', this.locale),
        invoice: item.invoice,
        balance: item.balance,
        amount: item.amount === 0 ? '' : item.amount
      }))
    }))
  }

  get bindTablePagination() {
    return {
      searchProps: {
        label: this.$t('search') as string,
        color: 'medium'
      },
      perPageProps: {
        label: this.$t('rowsPerPage') as string,
        color: 'medium',
        items: ['5', '10', '15']
      },
      sortProps: {
        label: this.$t('sortBy') as string,
        color: 'medium',
        items: [
          {
            value: '0',
            text: this.$t('ascending') as string
          },
          {
            value: '1',
            text: this.$t('descending') as string
          }
        ]
      }
    }
  }

  get locale() {
    if (this.localeShort === 'en') return 'en-US'
    return 'es-MX'
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }

  get amountAvailable() {
    if (!this.walletStore.summarysCards?.amountAvailable) return ''

    return this.currencyFormatDivisa({
      value: String(this.walletStore.summarysCards.amountAvailable)
    })
  }

  get totalEarned() {
    if (!this.walletStore.summarysCards?.earned) return ''
    return this.currencyFormatDivisa({value: String(this.walletStore.summarysCards.earned)})
  }

  get walletStore(): WalletStore {
    return new WalletStore()
  }

  onChangeActiveUniversalCredit(value: boolean, index: number) {
    this.itemsTable[index].active = value
  }

  onChangeItems({items}: any) {
    this.itemsTable = items
  }

  mounted() {
    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-wallet', 'wallet-universal'])
    this.walletStore.getUniversalCredits(this.applicationUserMember!)
  }
}
</script>
<style scoped>
::v-deep div.divide-y > div.bg-black {
  background-color: rgba(54, 54, 54, 0.5) !important;
}
</style>

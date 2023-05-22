<template>
  <div>
    <div class="pe-text-center md:pe-text-left">
      <span
        class="md:pe-font-sans uppercase pe-font-serif pe-font-medium md:pe-font-semibold pe-text-[24px] md:pe-text-[32px] pe-text-white"
      >
        {{ $t('summary') }}
      </span>
    </div>
    <PELoadingData v-if="showLoading || !universalCreditCard" />
    <div
      v-else
      class="lg:pe-grid xl:!pe-grid-cols-2 pe-gap-6"
    >
      <PECardResume
        v-if="universalCreditCard && !showNotFound"
        v-bind="universalCreditCard"
        class="pe-mt-[40px] md:pe-w-[480px]"
        @click-button="goTo"
      />
      <div
        v-if="showNotFound"
        class="pe-mt-[50px] pe-text-white"
      >
        <div class="pe-font-serif pe-text-[24px] uppercase">
          {{ $t('notFound') }}
        </div>
        <div class="pe-text-[16px] pe-font-sans">
          {{ $t('text') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import {WalletStore} from '../../store/benefits/walletStore'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import {UseAuth as AuthStore} from '~/src/ui/store/auth'
import i18n from '~/src/ui/i18n/wallet/summary.lang'
import CurrencyFormatDivisa from '~/src/ui/mixins/CurrencyFormatDivisa'
import {CardResume} from '~/src/app/benefits/domain/entities/cardResume'

@Component({
  i18n,
  meta: {
    auth: true
  }
})
export default class Summary extends Mixins(CurrencyFormatDivisa) {
  public loading: boolean = false

  async beforeMount() {
    await this.walletStore.getSummarys(this.applicationUserMember!)
  }

  get authStore(): AuthStore {
    return new AuthStore()
  }

  get walletStore(): WalletStore {
    return new WalletStore()
  }

  get showLoading(): boolean {
    return this.loading
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get benefitStore() {
    return new BenefitStore()
  }

  titleLocale(title: string): string {
    return this.$t(title) as string
  }

  get showNotFound(): boolean {
    return this.walletStore.summarysCards?.account === ''
  }

  get universalCreditCard(): CardResume | null {
    if (!this.walletStore.summarysCards) return null

    const amount = this.walletStore.summarysCards.amountAvailable

    return {
      amount: `${amount} USD`,
      title: this.$t('universalCredit') as string,
      subtitle: this.$t('amountAvailable') as string,
      textButton: this.$t('useNow') as string
    }
  }

  mounted() {
    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-wallet', 'wallet-summary'])
  }

  goTo() {
    this.$nuxt.$router.push(this.localePath('/build-your-search'))
  }
}
</script>

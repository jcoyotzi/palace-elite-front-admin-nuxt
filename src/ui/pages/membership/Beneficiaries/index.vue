<template>
  <section class="pe-flex-grow">
    <div class="md:pe-flex justify-between pe-items-center pe-mb-10">
      <h1
        class="pe-text-white pe-text-center pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10 md:pe-mb-0"
      >
        {{ $t('membership.beneficiaries') }}
      </h1>
      <PEButton v-if="addBeneficiary" />
    </div>
    <MembershipCommonTable
      :memberships="beneficiaries"
      :show-delete-button="false"
      :is-loading="isLoadingBeneficiaries"
      @edit-button-click="onEditButtonClick"
    />
  </section>
</template>

<script lang="ts">
import {Component, Emit, Mixins} from 'vue-property-decorator'
import {UseAuth} from '../../../store/auth'
import {BeneficiaryStore} from '../../../store/beneficiaryStore'
import {MembershipTable} from '~/src/app/common/domain/entities/membershipTable'
import BasePageStrapiMixin from '~/src/ui/mixins/BasePageStrapiMixin'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  }
})
export default class Beneficiaries extends Mixins (BasePageStrapiMixin) {
  beneficiaryStore = new BeneficiaryStore()
  public authStore = new UseAuth()

  // #region Data
  public beneficiaries: MembershipTable[] = []

  public addBeneficiary: boolean = false

  public isLoadingBeneficiaries: boolean = false


  // #endregion Data

  mounted() {
    this.getBeneficiaries()
    this.cleanBeneficiary()
  }

  async beforeMount() {
    await this.loadStrapiPageData(BasePageSlugs.Beneficiaries);
  }

  async getBeneficiaries() {
    this.isLoadingBeneficiaries = true
    await this.beneficiaryStore.getBeneficiaries({
      application: this.authStore.userAffiliationId,
      company: this.authStore.userCompany,
      isNational: this.authStore.isNational
    })
    
    this.beneficiaries = this.beneficiaryStore.readBeneficiaries
    this.isLoadingBeneficiaries = false
  }

  public onEditButtonClick(beneficiary: MembershipTable) {
    this.beneficiaryStore.$patch({
      beneficiarySelected: beneficiary
    })
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/Beneficiaries/BeneficiariesDetails'))
  }

  @Emit()
  onMenuItem() {
    const items = [
      {
        page: this.localePath('/membership/SummaryandPayments'),
        title: 'Membership'
      },
      {
        page: this.localePath('/membership/Beneficiaries'),
        title: 'Beneficiaries'
      },
      {
        page: this.localePath('/membership/Beneficiaries/BeneficiariesDetails'),
        title: 'Details'
      }
    ]
    return items
  }

  public cleanBeneficiary() {
    this.beneficiaryStore.$patch({
      beneficiarySelected: null
    })
  }
}
</script>

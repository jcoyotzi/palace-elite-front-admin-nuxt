<template>
  <section class="pe-w-full">
    <h1
      class="pe-text-white pe-text-center lg:pe-text-left pe-font-serif pe-text-2xl pe-uppercase lg:!pe-text-[32px] pe-font-medium lg:!pe-font-normal pe-mb-10"
    >
      Beneficiaries Details
    </h1>
    <div class="pe-flex pe-mb-10 pe-w-full pe-justify-between">
      <ButtonBack
        button-label="Back to list"
        @back="goBack"
      />
      <PEButton
        v-if="beneficiary && deleteButton"
        label="Delete Beneficiary"
        text
        flat
        uppercase
        class="pe-py-0"
        :disabled="isLoading"
        :class="{'pe-pointer-events-none': isLoading}"
        @click="deleteBeneficiary"
      />
    </div>
    <MembershipCommonDetails
      :membership="beneficiary"
      :is-guest="false"
      :is-beneficiary="true"
      :is-loading="isLoading"
      @on-go-back="goBack"
      @submit="onSubmit"
    >
    </MembershipCommonDetails>
  </section>
</template>
<script lang="ts">
import {Component, Vue, Emit} from 'vue-property-decorator'
import Beneficiarie from '~/src/app/beneficiaries/domain/entity/beneficiarie'
import {MembershipDetailsInputs} from '~/src/app/common/domain/entities/membershipDetailsInputs'
import {SaveBeneficiaryAdapter} from '~/src/app/beneficiaries/domain/mapper/saveBeneficiaryAdapter'
import {BeneficiaryStore} from '~/src/ui/store/beneficiaryStore'
import ButtonBack from '~/src/ui/components/Membership/Common/ButtonBack.vue'

@Component({
  meta: {
    auth: true
  },
  components: {
    ButtonBack
  }
})
export default class BeneficiariesDetails extends Vue {
  public beneficiary: Beneficiarie | null = null // MembershipTable | {} = {}

  public beneficiaryStore = new BeneficiaryStore()

  public saveBeneficiaryAdapter = new SaveBeneficiaryAdapter()

  public deleteButton: boolean = false

  // #region Hooks
  beforeMount() {
    this.beneficiary = this.beneficiaryStore.readSelectedBeneficiary
  }
  // #endregion Hooks

  public get isLoading(): boolean {
    return this.beneficiaryStore.readIsLoading
  }

  public goBack() {
    this.onMenuItem()
    this.$nuxt.$router.push(this.localePath('/membership/Beneficiaries'))
  }

  public async onSubmit(details: MembershipDetailsInputs) {
    this.beneficiaryStore.$patch({
      beneficiaryDetails: details,
      isLoading: true
    })
    const saved = await this.saveBeneficiaryAdapter.saveBeneficiary()
    if (saved) this.goBack()
    this.beneficiaryStore.$patch({
      isLoading: false
    })
  }

  @Emit()
  deleteBeneficiary() {
    // eslint-disable-next-line no-console
    // console.log('emit: deleteBeneficiary')
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
      }
    ]
    return items
  }
}
</script>

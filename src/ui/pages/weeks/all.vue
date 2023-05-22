<template>
  <WeeksCommonPagination />
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import {WeekStore} from '~/src/ui/store/benefits/weekStore'
import {UseAuth} from '~/src/ui/store/auth'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  },
  scrollToTop: true
})
export default class All extends Mixins (BasePageStrapiMixin) {
  async beforeMount() {
    this.benefitStore.getFilterSelected(
      [
        'All',
        'Imperial Week',
        'Imperial Night',
        'Anniversary Week',
        'Anniversary Night',
        'Bonus Week',
        'Incentive Week',
        'Available',
        'Expired',
        'Used',
        'To Release',
        'Reserved'
      ],
      [0, 1]
    )

    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-weeks', 'weeks-all'])

    await this.loadStrapiPageData(BasePageSlugs.AllWeeks);
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }

  get authStore(): UseAuth {
    return new UseAuth()
  }

  get applicationUserMember() {
    return this.authStore.applicationUserMember
  }

  get userCompany() {
    return this.authStore.userCompany
  }

  get weekStore(): WeekStore {
    return new WeekStore()
  }
}
</script>

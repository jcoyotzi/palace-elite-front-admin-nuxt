<template>
  <WeeksCommonPagination />
</template>
<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import BasePageStrapiMixin from '../../mixins/BasePageStrapiMixin'
import {BenefitStore} from '~/src/ui/store/benefits/benefitStore'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  meta: {
    auth: true
  }
})
export default class Incentive extends Mixins (BasePageStrapiMixin) {
  async beforeMount() {
    this.benefitStore.getFilterSelected(
      ['All', 'Available', 'Used', 'Reserved', 'To Release', 'Expired', 'Incentive Week'],
      [0]
    )

    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-weeks', 'weeks-incentive'])

    await this.loadStrapiPageData(BasePageSlugs.IncentiveWeeks)
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }
}
</script>

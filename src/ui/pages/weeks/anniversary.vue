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
export default class Anniversary extends Mixins (BasePageStrapiMixin) {
  async beforeMount() {
    this.benefitStore.getFilterSelected(
      ['All', 'Available', 'Used', 'Reserved', 'To Release', 'Expired', 'Anniversary Week'],
      [0]
    )

    this.benefitStore.setBreadcrumbsKeys(['benefits', 'benefits-weeks', 'weeks-anniversary'])

    await this.loadStrapiPageData(BasePageSlugs.AnniversaryWeeks);
  }

  get benefitStore(): BenefitStore {
    return new BenefitStore()
  }
}
</script>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../../_.vue';
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration';

@Component({
  name: 'BenefitProgramReferralPage',
  layout: 'default',
  meta: {
    auth: true
  }
})
export default class BenefitProgramReferralPage extends SlugBasePage {
  public slugPage: BasePageSlugs = BasePageSlugs.ReferralProgram;
}
</script>

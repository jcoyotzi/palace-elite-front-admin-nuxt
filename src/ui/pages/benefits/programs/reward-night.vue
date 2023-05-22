<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../../_.vue'
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  name: 'RewardNightPage',
  layout: 'default',
  meta: {
    auth: true
  }
})
export default class RewardNightPage extends SlugBasePage {
  public slugPage: BasePageSlugs = BasePageSlugs.RewardNights;
}
</script>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../_.vue';
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration';

@Component({
  name: 'OffersPage',
  layout: 'default'
})
export default class OffersPage extends SlugBasePage {
  public slugPage: BasePageSlugs = BasePageSlugs.Offers;
}
</script>

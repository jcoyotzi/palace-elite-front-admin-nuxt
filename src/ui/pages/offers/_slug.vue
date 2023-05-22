<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../_.vue';
import { BaseTypePages } from '~/src/app/Strapi/StrapiConfiguration';

@Component({
  name: 'OfferSlug',
  layout: 'default'
})
export default class OfferSlug extends SlugBasePage {
  public typePage: BaseTypePages = BaseTypePages.Offer;
}
</script>

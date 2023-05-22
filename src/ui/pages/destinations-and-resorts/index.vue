<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../_.vue';
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration';

@Component({
  name: 'DestinationsAndResortsPage',
  layout: 'default'
})
export default class DestinationsAndResortsPage extends SlugBasePage {
  public slugPage: BasePageSlugs = BasePageSlugs.DestinationsAndResorts;
}
</script>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SlugBasePage from '../_.vue'
import { BaseTypePages } from '~/src/app/Strapi/StrapiConfiguration'

@Component({
  name: 'DestinationAndResortSlugPage',
  layout: 'default'
})
export default class DestinationAndResortSlugPage extends SlugBasePage {
  public typePage: BaseTypePages = BaseTypePages.Resort;
}
</script>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { BasePageSlugs } from '../../../app/Strapi/StrapiConfiguration';
import SlugBasePage from '../_.vue';

@Component({
  name: 'NotFound404Page',
  layout: 'default'
})
export default class NotFound404Page extends SlugBasePage {
  public slugPage: BasePageSlugs = BasePageSlugs.NotFound404;
}
</script>

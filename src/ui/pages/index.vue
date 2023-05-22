<script lang="ts">
import SlugBasePage from './_.vue';
import { BasePageSlugs } from '~/src/app/Strapi/StrapiConfiguration';

export default class IndexPage extends SlugBasePage {
  public slugPage: string = BasePageSlugs.Home;
}
</script>
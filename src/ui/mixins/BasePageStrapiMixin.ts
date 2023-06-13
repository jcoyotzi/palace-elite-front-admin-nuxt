import { Component, Mixins } from 'vue-property-decorator'
import OnCurrentLocaleChanged from './OnCurrentLocaleChanged';
// import { StrapiComponent, blocksToComponentsAdapter } from '~/strapi/strapi-blocks.service';
import { BasePageSlugs, BaseTypePages, RouteWithSlug } from '~/src/app/Strapi/StrapiConfiguration';

@Component
export default class BasePageStrapiMixin extends Mixins (OnCurrentLocaleChanged) {
  public slugPage: BasePageSlugs | string = BasePageSlugs.Empty;
  public typePage: BaseTypePages = BaseTypePages.Base;

  // public components: StrapiComponent[] = [];
  public loadingComponents: boolean = false;

  // get heroAttrs() {
  //   return this.contentStore.heroDefault;
  // }

  async loadStrapiPageData(slugPage?: BasePageSlugs | string, typePage?: BaseTypePages, locale?: string): Promise<any> {
    slugPage = slugPage || this.slugPage;
    typePage = typePage || this.typePage;

    this.loadingComponents = true;
    
    if (slugPage.length && typePage.length) {
      const response = await this.contentStore.loadPage(slugPage, typePage, locale);

      if (response?.data && response.data[0] && response.data[0].attributes) {
        // this.components = await blocksToComponentsAdapter(response.data[0].attributes.blocks)
        this.loadingComponents = false;
        return response;
      }
    }

    // const route404: RouteWithSlug | undefined = this.contentStore.getRouteBySlugBaseAndLocale(BasePageSlugs.NotFound404, this.currentLocale);

    // this.$router.push(this.localePath(route404?.path || '/', this.$i18n.locale));
  }
}
import { Store, Pinia } from 'pinia-class-component'
import { BasePageSlugsContains, BaseTypePages, RouteLocalization, RouteWithSlug } from '../../app/Strapi/StrapiConfiguration'
import pageTypes from '~/src/app/common/types/pageTypes'
// import HeroDto from '~/src/app/layout/domain/dto/heroDto'
import PageRepository from '~/src/app/page/domain/repositories/pageRepository'
import { lazyInject } from '~/src/container'
// import { getCookie } from '~/src/ui/utils/cookieHelper'

@Store({
  name: 'ContentStore'
})
export class ContentStore extends Pinia {
  @lazyInject(pageTypes.pageRepository)
  private readonly pageRepository!: PageRepository

  public routesWithSlug: Array<RouteWithSlug> = [];

  public pagesLoaded: any = {}

  // public heroDefault: HeroDto = {
  //   title: '',
  //   media: {
  //     mime: 'image/jpeg',
  //     url: '',
  //     alt: '',
  //     title: ''
  //   },
  //   size: 'half'
  // }

  public heroAttrs: any = {}

  // constructHero(hero: any): any {
  //   if (!hero) return this.heroDefault;

  //   return {
  //     ...hero,
  //     media: {
  //       ...hero?.media.data.attributes,
  //       alt: hero?.altText,
  //       title: hero?.title
  //     },
  //     size: hero?.size ? hero?.size : 'half'
  //   }
  // }

  getCurrentLocale(): string {
    // return getCookie('i18n_redirected');
    return this.$nuxt.i18n.locale
  }

  async loadPage(slug: string, type: BaseTypePages): Promise<any> {
    let pageData: any;
    const locale = this.getCurrentLocale()

    slug = this.getValidateSlug(slug, locale)

    if (!this.pagesLoaded[type])
      this.pagesLoaded[type] = {}
    
    if (!this.pagesLoaded[type][locale])
      this.pagesLoaded[type][locale] = {}

    const collection = this.pagesLoaded[type][locale]

    if (collection[slug]) {
      pageData = collection[slug]
    } else {
      if (type === BaseTypePages.Base)
        pageData = await this.pageRepository.getBySlug(slug, locale)
      else if (type === BaseTypePages.Resort)
        pageData = await this.pageRepository.getDestinationBySlug(slug, locale)
      else if (type === BaseTypePages.Offer)
        pageData = await this.pageRepository.getOfferBySlug(slug, locale)

      collection[slug] = pageData
    }

    // if (pageData.data && pageData.data[0] && pageData.data[0].attributes) {
    //   this.heroDefault = this.constructHero(pageData.data[0].attributes.hero)
    // }

    return pageData;
  }

  getValidateSlug(slug: string, locale: string): string {
    if (locale !== 'en' && BasePageSlugsContains(slug)) {
      slug = `${slug}-${locale}`;
    }

    return slug;
  }

  async getHeroWithDescription() {
    return await this.pageRepository.getHeroWithDescription(this.$nuxt.i18n.locale)
  }

  async getPageBySlug(slug: string) {
    return await this.loadPage(slug, BaseTypePages.Base);
  }

  async getDestinationBySlug(slug: string) {
    return await this.loadPage(slug, BaseTypePages.Resort);
  }

  async getOfferBySlug(slug: string) {
    return await this.loadPage(slug, BaseTypePages.Offer);
  }

  getRouteWithSlugByPath(path: string): RouteWithSlug | undefined {
    return this.routesWithSlug.find(i => i.path === path);
  }

  getNextRouteByPath(path: string, locale: string): RouteWithSlug | undefined {
    const currentRoute = this.getRouteWithSlugByPath(path);
    if (currentRoute) {
      return this.getNextRouteByRoute(currentRoute, locale);
    }
  }

  getNextRouteByRoute(route: RouteWithSlug, locale: string): RouteWithSlug | undefined {
    const nextRoute = route.localizations.find((l: any) => l.locale === locale);
    if (nextRoute) {
      return this.findRouteWithSlug(nextRoute);
    }
  }

  findRouteWithSlug(route: RouteLocalization): RouteWithSlug | undefined {
    return this.routesWithSlug.find(i => i.id === route.id && i.type === route.type);
  }

  getRouteBySlugBaseAndLocale(slugBase: string, locale: string): RouteWithSlug | undefined {
    return this.routesWithSlug.find(i => i.slugBase === slugBase && i.locale === locale);
  }

  // async getPageBySlud(slug: string) {
  //   slug = slug || 'home'

  //   const pageData: any = await this.pageRepository.getBySlug(slug, 'en')

  //   this.heroDefault = this.constructHero(pageData.data[0]?.attributes?.hero)

  //   return pageData 
  // }
}

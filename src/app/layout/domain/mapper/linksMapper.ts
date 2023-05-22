import { LinkDto } from '../dto/navbarDto'
import { LinkEntity } from '../entities/linkEntity'
import { BaseTypePages, getConfigByLocale } from '~/src/app/Strapi/StrapiConfiguration';
import { PageTypes, LinkTypes } from '~/interfaces/Links'

export class LinksMapper {

  public static getSingle(link: LinkDto): LinkEntity {
    return {
      label: link?.label,
      tag: this.getTagByPageType(link),
      to: link?.page?.data?.attributes?.route || '',
      href: link?.url,
      target: link?.openNewTab ? '_blank' : '',
      slug: link?.page?.data?.attributes?.slug
    }
  }

  public static getStrapiToLink(link: LinkDto | undefined, locale?: string): LinkEntity | null {
    return link ? this.getStrapiToLinkEntity(link, BaseTypePages.Base, locale) : null;
  }

  public static getStrapiToLinkResort(link: LinkDto | undefined, locale?: string): LinkEntity | null {
    return link ? this.getStrapiToLinkEntity(link, BaseTypePages.Resort, locale) : null;
  }

  public static getStrapiToLinkOffer(link: LinkDto | undefined, locale?: string): LinkEntity | null {
    return link ? this.getStrapiToLinkEntity(link, BaseTypePages.Offer, locale) : null;
  }

  public static getStrapiToLinkEntity(link: LinkDto | undefined, typePage?: BaseTypePages, locale?: string): LinkEntity {
    if (!link) return {}

    const { openNewTab, type, page, label } = link;

    const target = openNewTab === true ? '_blank' : '_self';
    let tag: string = this.getTagByPageType(link);

    if (type === PageTypes.INTERNAL && (!page || !page?.data)) {
      if (openNewTab === true)
        return { label, tag, href: '#', target }
      return { label, tag, to: '#', target }
    }

    const url: string = link?.url || '';
    let to: string = '';
    let href: string = '';

    const slug: string = page?.data?.attributes.slug || ''
    let route: string = page?.data?.attributes.route || ''
    locale = locale || page?.data?.attributes.locale || 'en'
    const localePrefix = locale === 'en' ? '' : `/${locale}`

    if (type === PageTypes.INTERNAL) { // PAGE
      if (route) {
        if (route[0] !== '/') {
          route = `/${route}`;
        }
        to = `${localePrefix}${route}`;        
      } else if (typePage) {
        const source = this.getSourceByTypePage(typePage, locale);
        to = `${localePrefix}/${source}/${slug}`
      }
    } else if (type === PageTypes.EXTERNAL && url) { // URL
      href = url

      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        href = `${localePrefix}${href}`
      }

    } else {
      href = '#'
    }

    if (type === PageTypes.INTERNAL && openNewTab === true) {
      href = to;
      tag = LinkTypes.ANCHOR;
      to = '';
    }

    return to ? { label, tag, to } : { label, tag, href, target };
  }

  public static getStrapiToLinksMap(links: LinkDto[]): LinkEntity[] {
    return links.map((link: LinkDto) => this.getStrapiToLinkEntity(link, BaseTypePages.Base));
  }

  public static getStrapiToLinksMapResort(links: LinkDto[]): LinkEntity[] { 
    return links.map((link: any) => this.getStrapiToLinkEntity(link, BaseTypePages.Resort));
  }

  public static getStrapiToLinksMapOffer(links: LinkDto[]): LinkEntity[] { 
    return links.map((link: any) => this.getStrapiToLinkEntity(link, BaseTypePages.Offer));
  }

  private static getTagByPageType(link: LinkDto): string {
    return link?.type === PageTypes.INTERNAL ? LinkTypes.NUXT : LinkTypes.ANCHOR
  }

  public static getSourceByTypePage(typePage: BaseTypePages, locale: string): string {
    const config = getConfigByLocale(locale);

    return typePage === BaseTypePages.Resort ? config.resortsPrefix : config.offersPrefix;
  }
}

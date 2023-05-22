import axios from 'axios'
import { BaseTypePages, RouteWithSlug, getConfigByLocale } from '~/src/app/Strapi/StrapiConfiguration';

class StrapiHttpApi {
  public http: any;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.STRAPI_URL!,
      headers: {
        'Authorization': process.env.STRAPI_TOKEN!,
      }
    })
  }

  get(url: string, payload?: any) {
    return this.http.get(url, payload);
  }
}

class StrapiPagesService {
  private http = new StrapiHttpApi;

  public async getAllPages() {
    const basePages = await this.getPagesFromCollection('/api/base-pages', 'slug,route,locale');
    const resortPages = await this.getPagesFromCollection('/api/destination-and-resort-pages', 'slug,locale');
    const offerPages = await this.getPagesFromCollection('/api/offer-pages', 'slug,locale');

    return {basePages, resortPages, offerPages};
  }

  private async getPagesFromCollection(url: string, fields: string): Promise<any[]> {
    let pages: Array<any> = [];
    let numberPage: number = 1;

    while (numberPage > 0) {
      const result = await this.getPagesFromStrapi(url, fields, numberPage).then(({data}: any) => data)
      
      const data = result.data.map((item: any) => ({
        id: item.id,
        slug: item.attributes.slug,
        route: item.attributes.route,
        locale: item.attributes.locale,
        localizations: item.attributes.localizations.data.map(
          (i: any) => ({id: i.id, locale: i.attributes.locale})
        ),
      }));

      pages = pages.concat(data);

      if (++numberPage >= result.meta.pagination.pageCount) {
        numberPage = 0;
      }
    }

    return pages;
  }

  private getPagesFromStrapi(url: string, fields: string, numberPage: number) {
    return this.http.get(`${url}?fields=${fields}&pagination[pageSize]=100&pagination[page]=${numberPage}&populate[localizations][fields]=locale&locale=all`);
  }
}

const getPagesFromStrapi = () => {
  const service = new StrapiPagesService();
  return service.getAllPages();
}

const processRoutesWithSlug = (routes: Array<RouteWithSlug>, pages: Array<any>, type: BaseTypePages) => {

  pages.forEach((item: any) => {
    const {id, slug, locale} = item;
    const localizations = item.localizations.map((l: any) => ({id: l.id, locale: l.locale, type}));
    let path: string = item.route;
    let slugBase: string = slug;
    const config = getConfigByLocale(locale);

    if (type === BaseTypePages.Resort) {
      path = `/${config.resortsPrefix}/${slug}`;
    } else if (type === BaseTypePages.Offer) {
      path = `/${config.offersPrefix}/${slug}`;
    } else {
      slugBase = slug.endsWith('-en') || slug.endsWith('-es') ? slug.slice(0, -3) : slug;

      if (path && path[0] !== '/')
        path = `/${path}`
    }

    if (locale !== 'en') {
      path = `/${locale}${path}`;
    }
    
    routes.push({id, type, path, slug, slugBase, locale, localizations});
  })

  return routes;
}

export const getRoutesWithSlug = async () => {
  const { basePages, resortPages, offerPages } = await getPagesFromStrapi();

  let routes: Array<RouteWithSlug> = [];

  routes = processRoutesWithSlug(routes, basePages, BaseTypePages.Base);
  routes = processRoutesWithSlug(routes, resortPages, BaseTypePages.Resort);
  routes = processRoutesWithSlug(routes, offerPages, BaseTypePages.Offer);
  
  return routes;
}

export default interface PageRepository {
  getBySlug(slug: string, locale: string): Promise<any>
  getHeroWithDescription(locale: string): Promise<any>
  getDestinationBySlug(slug: string, locale: string): Promise<any>
  getOfferBySlug(slug: string, locale: string): Promise<any>
}

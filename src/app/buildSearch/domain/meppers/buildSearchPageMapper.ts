import BuildSearchPageDto from '../dto/buildSearchPageDto'

export class BuildSearchPageMapper {
  static mapBuildSearchPage(buidSearchPageObject: BuildSearchPageDto) {
    if(!buidSearchPageObject) return

    const object = buidSearchPageObject.data[0]?.attributes

    if (!object) return

    return {
      hero: this.mapHeroImage(object.hero, false),
      heroMobile: object.hero.mediaMobile ? this.mapHeroImage(
        object.hero,
        true
      ) : null
    }
  }

  static mapHeroImage(block: any, mobile: boolean) {
    const {title, size, enableNotMemberBanner, media, mediaMobile} = block
    return {
      title,
      size,
      enableNotMemberBanner,
      media: {
        title: mobile ? mediaMobile?.title : media?.title,
        alt: mobile ? mediaMobile?.alternativeText : media?.altText,
        mime: mobile ? mediaMobile?.data.attributes.mime : media?.data.attributes.mime,
        url: mobile ? mediaMobile?.data.attributes.url : media?.data.attributes.url,
        // formats: media.media.data.attributes.formats
      }
    }
  }
}

import OfferPageDto, {DirectLinks, InfoBannerDto, CardOffer} from '../dto/offerPageDto'

export class OfferPageMapper {
  static mapOfferPage(OfferPageObject: OfferPageDto) {
    const object = OfferPageObject.data[0].attributes

    if (!object) return

    return {
      hero: this.mapHeroImage(
        object.blocks.find(block => block.__component === 'blocks.hero-image')
      ),
      banner: this.mapBanner(
        object.blocks.find(block => block.__component === 'blocks.title-content')
      ),
      cardOffer: this.mapCardOffer(
        object.blocks.filter(block => block.__component === 'blocks.booking-offer')
      ),
      bannerInfo: this.mapBannerInfo(
        object.blocks.find(
          block => block.__component === 'blocks.info-banner'
        ) as unknown as InfoBannerDto
      ),
      directLinks: this.mapDirectLinks(
        object.blocks.find(
          block => block.__component === 'blocks.direct-links'
        ) as unknown as DirectLinks
      )
    }
  }

  static mapHeroImage(block: any) {
    const {title, size, enableNotMemberBanner, media} = block
    return {
      title,
      size,
      enableNotMemberBanner,
      media: {
        title: media?.title,
        alt: media?.altText,
        mime: media?.media.data.attributes.mime,
        url: media?.media.data.attributes.url
      }
    }
  }

  static mapBanner(block: any) {
    const {title, content} = block
    return {
      title,
      content
    }
  }

  static mapBannerImg(block: any) {
    const {media} = block

    if (!block) return null

    const img = media?.media.data.attributes

    const imageMap = {
      mime: img.mime,
      url: img.url,
      alt: img.altternativeText,
      title: media.title,
      fromats: img.formats
    }

    return imageMap
  }

  static mapCardOffer(blocks: any) {
    if (!blocks) return null

    const cardOfferMap: CardOffer[] = blocks.map(
      (block: {
        caption: any
        title: any
        content: any
        mediaOnLeft: any
        isPrimary: any
        media: {media: {data: {attributes: {url: any}}}; title: any; altText: any}
      }) => ({
        caption: block.caption,
        title: block.title,
        content: block.content,
        mediaOnLeft: block.mediaOnLeft,
        isPrimary: block.isPrimary,
        img: {
          url: block.media.media.data.attributes.url,
          title: block.media.title,
          alt: block.media.altText
        }
      })
    )
    return cardOfferMap
  }

  static mapBannerInfo(block: InfoBannerDto) {
    if (!block) return null

    const bannerInfo = {
      title: block.title,
      sections: block.items.data.map(item => ({
        title: item.attributes.title,
        content: item.attributes.content.split(/\n/)
      }))
    }

    return bannerInfo
  }

  static mapDirectLinks(block: DirectLinks) {
    if (!block) return null

    const links = block.items.data.map(item => ({
      image: {
        mime: item.attributes.image.data.attributes.mime,
        url: item.attributes.image.data.attributes.url,
        alt: item.attributes.image.data.attributes.alternativeText,
        title: item.attributes.image.data.attributes.name,
        alternativeText: item.attributes.image.data.attributes.alternativeText,
        caption: item.attributes.image.data.attributes.caption
      },
      title: item.attributes.title,
      content: item.attributes.content,
      buttonLabel: item.attributes.buttonLabel
    }))

    return links
  }
}

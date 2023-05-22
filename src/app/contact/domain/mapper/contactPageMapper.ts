import ContactPageDto, {InfoBannerDto, OfferCardGrid} from '../dto/contactPageDto'

export class ContactPageMapper {
  static mapContactPage(ContactPageObject: ContactPageDto) {
    const object = ContactPageObject.data[0].attributes
    if (!object) return

    const galleryStrapi = object.blocks.find(
      block => block.__component === 'blocks.service-gallery'
    ) as unknown

    return {
      hero: this.mapHeroImage(
        object.hero
      ),
      banner: this.mapBanner(
        object.blocks.find(block => block.__component === 'blocks.title-content')
      ),
      bannerImg: this.mapBannerImg(
        object.blocks.find(block => block.__component === 'blocks.banner-section')
      ),
      bannerInfo: this.mapBannerInfo(
        object.blocks.find(
          block => block.__component === 'blocks.get-in-touch'
        ) as unknown as InfoBannerDto
      ),
      directLinks: this.mapDirectLinks(
        object.blocks.find(
          block => block.__component === 'blocks.offer-card-grid'
        ) as unknown as OfferCardGrid
      ),
      gallery: galleryStrapi ? this.galleryMapper(galleryStrapi) : null
    }
  }

  static mapHeroImage(block: any) {
    if(!block) return
    const {title, size, enableNotMemberBanner, media} = block
    return {
      title,
      size,
      enableNotMemberBanner,
      media: {
        title: media?.data.attributes.alternativeText,
        alt: media?.alternativeText,
        mime: media?.data.attributes.mime,
        url: media?.data.attributes.formats.large?.url
      }
    }
  }

  static mapBanner(block: any) {
    if(!block) return
    const {title, content} = block
    return {
      title,
      content
    }
  }

  static mapBannerImg(block: any) {
    if(!block) return
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

  static mapBannerInfo(block: InfoBannerDto) {
    if (!block) return null

    const bannerInfo = {
      title: block.title,
      sections: block.departments.map(item => ({
        title: item.title,
        content: item.description.split(/\n/)
      }))
    }

    return bannerInfo
  }

  static mapDirectLinks(block: OfferCardGrid) {
    if (!block) return null

    const offers = [block.firstOfferCard, block.secondOfferCard].filter((offer) => offer !== null)

    const links = offers.map(item => {
      if(!item) return null

      const { media } = item

      return {
        image: {
          mime: media.media.data.attributes.mime,
          url: media.media.data.attributes.url,
          alt: media.media.data.attributes.alternativeText,
          title: media.media.data.attributes.name,
          alternativeText: media.media.data.attributes.alternativeText,
          caption: media.media.data.attributes.caption
        },
        title: item.title,
        content: item.description,
        buttonLabel: item.link.label
      }
    })

    return links
  }

  static galleryMapper(response: any) {
    return {
      items: response.images.map((image: any) => {
        const link = image.link?.data?.attributes?.slug
        return {
          subtitle: image.subtitle,
          caption: image.caption,
          title: image.title,
          link: link ? `/resorts/${link}` : null,
          image: {
            mime: image.image.media.data.attributes.mime,
            url: image.image.media.data.attributes.url,
            alt: image.image.media.data.attributes.alternativeText,
            title: image.image.media.data.attributes.name,
            alternativeText: image.image.media.data.attributes.alternativeText,
            caption: image.image.media.data.attributes.caption,
          }
        }
      }),
      uppercase: true
    }
  }
  
}

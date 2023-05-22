import {StrapiPreferentialDto} from '../dto/strapiPreferentialDto'

export class StrapiPreferentialMapper {
  static mapPreferentialPage(strapiObject: StrapiPreferentialDto) {
    if (strapiObject && strapiObject.data[0]) {
      const object = strapiObject.data[0].attributes
      return {
        widget: this.mapWidget(object.blocks.find(block => block.__component === "blocks.preferential-week-card")),
      }
    }

    return null;
  }

  static mapHero(block: any) {
    const { title, size, enableNotMemberBanner, media } = block
    return {
      title,
      size,
      enableNotMemberBanner,
      media: {
        title: media?.title,
        alt: media?.altText,
        mime: media?.media.data.attributes.mime,
        url: media?.media.data.attributes.formats.large?.url
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

  static mapWidget(block: any) {
    const {title, description, firstButton, secondButton, media} = block
    return {
      title,
      description,
      primaryBtnLabel: firstButton?.label,
      secondaryBtnLabel: secondButton?.label,
      media: {
        title: media?.title,
        alt: media?.altText,
        mime: media?.media.data.attributes.mime,
        url: media?.media.data.attributes.formats.medium?.url
      }
    }
  }

  static mapTestimonials(block: any) {
    const {items} = block
    const array = items.data.map(({id, attributes}: any) => ({
      id,
      title: attributes.caption,
      description: attributes.testimonial,
      authorName: attributes.authorName,
      authorOrigin: attributes.authorOrigin
    }))

    return array
  }
}

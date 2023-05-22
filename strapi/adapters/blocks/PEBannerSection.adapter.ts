import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper"

const PEBannerSectionAdapter: any = {
  blockToComponent: (response: any) => {
    if(!response.banner.data) return {}

    const attributes = response.banner.data.attributes

    return {
      id: `${response.__component}-${response.id}`,
      title: attributes.title,
      description: attributes.description,
      button: LinksMapper.getStrapiToLink(attributes.button),
      media: {
        mime: attributes.media.media.data.attributes.mime,
        alt: attributes.media.media.data.attributes.alternativeText,
        title: attributes.media.title,
        url: attributes.media.media.data.attributes.url
      }
    }
  }
}

export { PEBannerSectionAdapter }
        
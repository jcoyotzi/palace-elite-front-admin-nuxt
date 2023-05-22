import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEBannerSliderAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      items: response.banners.data.map((banner: any) => ({
        description: banner.attributes.description,
        title: banner.attributes.title,
        media: {
          mime: banner.attributes.media.media.data.attributes.mime,
          url: banner.attributes.media.media.data.attributes.url,
          alt: banner.attributes.media.media.data.attributes.alternativeText,
          title: banner.attributes.media.title,
          formats: banner.attributes.media.media.data.attributes.formats,
          alternativeText: banner.attributes.media.media.data.attributes.alternativeText,
          caption: banner.attributes.media.media.data.attributes.caption,
        },
        button: LinksMapper.getStrapiToLink(banner.attributes.button),
      }))
    }
  }
}

export { PEBannerSliderAdapter };

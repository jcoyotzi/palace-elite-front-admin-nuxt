import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PECarouselAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      description: response.description,
      items: response.items.data.map((item: any) => ({
        title: item.attributes.title,
        image: {
          mime: item.attributes.media.media.data.attributes.mime,
          url: item.attributes.media.media.data.attributes.url,
          alt: item.attributes.media.altText,
          title: item.attributes.media.title,
          alternativeText: item.attributes.media.media.data.attributes.alternativeText,
          caption: item.attributes.media.media.data.attributes.caption
        },
        link: LinksMapper.getStrapiToLink(item.attributes.link),
      })),
      button: LinksMapper.getStrapiToLink(response.button),
    }
  }
};

export { PECarouselAdapter }

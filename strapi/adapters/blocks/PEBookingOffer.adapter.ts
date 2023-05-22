import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEBookingOfferAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      caption: response.caption,
      title: response.title,
      content: response.content,
      firstButton: LinksMapper.getStrapiToLinkOffer(response.firstButton),
      secondButton: LinksMapper.getStrapiToLinkOffer(response.secondButton),
      media: {
        mime: response.media.media.data.attributes.mime,
        alt: response.media.media.data.attributes.alternativeText,
        title: response.media.title,
        url: response.media.media.data.attributes.url
      },
      mediaOnLeft: response.mediaOnLeft,
      isPrimary: response.isPrimary,
    }
  }
}

export { PEBookingOfferAdapter };
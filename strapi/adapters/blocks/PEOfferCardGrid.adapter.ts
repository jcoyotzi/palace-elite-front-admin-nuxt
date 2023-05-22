import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEOfferCardGridAdapter: any = {
  blockToComponent: (response: any) => {
    const { firstOfferCard, secondOfferCard } = response;

    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      firstOfferCard: {
        title: firstOfferCard.title,
        description: firstOfferCard.description,
        link: LinksMapper.getStrapiToLinkOffer(firstOfferCard.link),
        media: {
          mime: firstOfferCard.media.media.data.attributes.mime,
          alt: firstOfferCard.media.media.data.attributes.alternativeText,
          title: firstOfferCard.media.title,
          url: firstOfferCard.media.media.data.attributes.url
        },
        isPrimaryButton: firstOfferCard.isPrimaryButton,
      },
      secondOfferCard: {
        title: secondOfferCard.title,
        description: secondOfferCard.description,
        link: LinksMapper.getStrapiToLinkOffer(secondOfferCard.link),
        media: {
          mime: secondOfferCard.media.media.data.attributes.mime,
          alt: secondOfferCard.media.media.data.attributes.alternativeText,
          title: secondOfferCard.media.title,
          url: secondOfferCard.media.media.data.attributes.url
        },
        isPrimaryButton: secondOfferCard.isPrimaryButton,
      }
    }
  }
}

export { PEOfferCardGridAdapter }
        
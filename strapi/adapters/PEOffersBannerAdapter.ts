import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

export function blockToComponent(response: any) {
  const { firstCardColumn, secondCardColumn, thirdCardColumn } = response;

  return {
    title: response.title,
    button: LinksMapper.getStrapiToLink(response.rightButton),
    offers: [firstCardColumn, secondCardColumn, thirdCardColumn].map((card) => ({
      content: card.description,
      title: card.title,
      image: {
        mime: card.image.media.data.attributes.mime,
        url: card.image.media.data.attributes.url,
        alt: card.image.media.data.attributes.alternativeText,
        title: card.image.title,
        formats: card.image.media.data.attributes.formats,
        alternativeText: card.image.media.data.attributes.alternativeText,
        caption: card.image.media.data.attributes.caption,
      },
      link: LinksMapper.getStrapiToLinkOffer(card.link),
    }))
  }
}
import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PETitleDescriptionOfferAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      descriptionWidth: response.descriptionWidth,
      description: response.description,
      firstButton: LinksMapper.getStrapiToLinkOffer(response.firstButton),
      secondButton: LinksMapper.getStrapiToLinkOffer(response.secondButton),
    }
  }
}

export { PETitleDescriptionOfferAdapter };

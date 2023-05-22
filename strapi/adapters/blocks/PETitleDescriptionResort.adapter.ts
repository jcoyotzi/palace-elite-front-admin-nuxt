import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PETitleDescriptionResortAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      descriptionWidth: response.descriptionWidth,
      description: response.description,
      firstButton: LinksMapper.getStrapiToLinkResort(response.firstButton),
      secondButton: LinksMapper.getStrapiToLinkResort(response.secondButton),
    }
  }
}

export { PETitleDescriptionResortAdapter };

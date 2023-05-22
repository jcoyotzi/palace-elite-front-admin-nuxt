import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PETitleDescriptionAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      descriptionWidth: response.descriptionWidth,
      description: response.description,
      firstButton: LinksMapper.getStrapiToLink(response.firstButton),
      secondButton: LinksMapper.getStrapiToLink(response.secondButton),
    }
  }
}

export { PETitleDescriptionAdapter };

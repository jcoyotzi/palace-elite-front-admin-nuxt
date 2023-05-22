import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEInformationImageAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      content: response.content,
      mediaOnLeft: response.mediaOnLeft,
      media: {
        mime: response.media.media.data.attributes.mime,
        alt: response.media.media.data.attributes.alternativeText,
        title: response.media.title,
        url: response.media.media.data.attributes.url
      },
      firstButton: LinksMapper.getStrapiToLink(response.firstButton),
      firstButtonIsPrimary: response.firstButtonIsPrimary,
      firstButtonIsOutlined: response.firstButtonIsOutlined,
      secondButton: LinksMapper.getStrapiToLink(response.secondButton),
      secondButtonIsPrimary: response.secondButtonIsOutlined,
      secondButtonIsOutlined: response.secondButtonIsPrimary,
    }
  }
}

export { PEInformationImageAdapter };

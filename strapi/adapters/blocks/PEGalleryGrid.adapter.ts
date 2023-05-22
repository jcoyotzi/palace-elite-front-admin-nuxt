import { LinksMapper } from "~/src/app/layout/domain/mapper/linksMapper";

const PEGalleryGridAdapter: any = {
  blockToComponent(response: any) {
    return {
      id: `${response.__component}-${response.id}`,
      images: response.images.map((image: any) => ({
        subtitle: image.subtitle,
        caption: image.caption,
        title: image.title,
        link: LinksMapper.getStrapiToLinkResort(image.link),
        image: {
          mime: image.image.media.data.attributes.mime,
          url: image.image.media.data.attributes.url,
          alt: image.image.media.data.attributes.alternativeText,
          title: image.image.media.data.attributes.name,
          // formats: image.image.media.data.attributes.formats,
          alternativeText: image.image.media.data.attributes.alternativeText,
          caption: image.image.media.data.attributes.caption,
        },
      }))
    }
  }
}

export { PEGalleryGridAdapter };

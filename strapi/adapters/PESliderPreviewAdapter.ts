import { PESliderPreview } from "../types/PESliderPreview";

export function blockToComponent(response: PESliderPreview) {
  return {
    items: response.images.map((image) => ({
      media: {
        mime: image.media.data.attributes.mime,
        url: image.media.data.attributes.url,
        alt: image.altText,
        title: image.title,
        formats: image.media.data.attributes.formats,
        alternativeText: image.media.data.attributes.alternativeText,
        caption: image.media.data.attributes.caption
      }
    }))
  } 
}

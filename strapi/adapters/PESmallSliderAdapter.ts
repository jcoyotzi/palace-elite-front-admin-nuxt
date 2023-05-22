import { PESmallSliderBanner } from "../types/PESmallSliderBanner";

export function blockToComponent(response: PESmallSliderBanner) {
  return {
    id: `${response.__component}-${response.id}`,
    title: response.title,
    content: response.description,
    items: response.items.data.map((item) => ({
      title: item.attributes.title,
      media: {
        mime: item.attributes.media.media.data.attributes.mime,
        url: item.attributes.media.media.data.attributes.url,
        alt: item.attributes.media.altText,
        title: item.attributes.media.title,
        // formats: item.attributes.media.media.data.attributes.formats,
        alternativeText: item.attributes.media.media.data.attributes.alternativeText,
        caption: item.attributes.media.media.data.attributes.caption
      }
    }))
  }
}
